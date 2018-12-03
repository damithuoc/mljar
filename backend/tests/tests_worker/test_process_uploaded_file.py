import os
import sys

import unittest
import requests
import copy
from tests.test_base import TestBase
from tests.data.example import example_X, example_y
from tests.data.example import data_to_file

from datasources.models import FileDataSource

from projects.models import Project
from ml.models import MLExperiment
from ml.models import MLModel
from accounts.models import MljarUser, Organization

from storage.storage import Storage


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
        local_file_name = "example.csv"

        destination = "test"
        storage_path = Storage().get_path(destination, local_file_name)

        data_to_file(example_X, example_y, storage_path)

        ds = FileDataSource(
            title="my file",
            description="desc ...",
            file_path=storage_path,
            file_name=local_file_name,
            file_size=os.path.getsize(storage_path),
            created_by=user,
            parent_organization=organization,
            parent_project=project,
        )
        ds.save()

        job_params = {
            "file_path": ds.file_path,
            "file_name": ds.file_name,
            "db_id": ds.id,
        }
        print(job_params)
