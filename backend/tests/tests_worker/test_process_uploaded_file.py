import os
import sys
import time
import unittest
import requests
import copy
from tests.test_base import TestBase
from tests.data.example import example_X, example_y
from tests.data.example import data_to_file

from apps.datasources.models import FileDataSource
from apps.datasources.models import DataFrame

from apps.projects.models import Project
from apps.ml.models import MLExperiment
from apps.ml.models import MLModel
from apps.accounts.models import MljarUser, Organization

from storage.storage import Storage

from worker.etl.process_uploaded_file import ProcessUploadedFile


class TestProcessUploadedFile(TestBase):
    def test_preprocess(self):

        token = self.create_user_and_login(self.user1_params)
        organization = Organization.objects.get(slug=self.org1)
        user = MljarUser.objects.get(email=self.user1_params["email"])
        project = Project(
            title="some title",
            description="...",
            created_by=user,
            parent_organization=organization,
        )
        project.save()

        # prepare data
        local_full_file_path = "/tmp/example.csv"
        filename = "example.csv"

        relative_dir = "test"
        absolute_path = Storage().get_path(relative_dir, filename)

        data_to_file(example_X, example_y, absolute_path)

        ds = FileDataSource(
            title="my file",
            description="desc ...",
            absolute_path=absolute_path,
            file_name=filename,
            file_size=os.path.getsize(absolute_path),
            created_by=user,
            parent_organization=organization,
            parent_project=project,
        )
        ds.save()

        job_params = {
            "absolute_path": ds.absolute_path,
            "file_name": ds.file_name,
            "db_id": ds.id,
            "created_by_id": ds.created_by.id,
            "parent_organization_id": ds.parent_organization.id,
            "parent_project_id": ds.parent_project.id,
        }

        self.assertEqual(DataFrame.objects.all().count(), 0)
        process_file = ProcessUploadedFile(job_params)
        process_file.run()
        time.sleep(1)  # not nice but till no websockets, let's use it
        self.assertEqual(DataFrame.objects.all().count(), 1)
        self.assertTrue(DataFrame.objects.filter(source_id=ds.id).count(), 1)
