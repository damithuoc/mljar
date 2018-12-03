import unittest
import requests
import copy
from test_base import TestBase

from projects.models import Project
from ml.models import MLExperiment
from accounts.models import MljarUser, Organization


class TestMLExperiment(TestBase):
    def test_create_mlexperiment(self):
        token = self.create_user_and_login(self.user1_params)
        # should be empty
        organization = Organization.objects.get(slug=self.org1)
        user = MljarUser.objects.get(email=self.user1_params["email"])
        project = Project(
            title="some title",
            description="...",
            created_by=user,
            parent_organization=organization,
        )
        project.save()

        payload = {
            "title": "New experiment",
            "description": "Completely new",
            "params": {},
            "column_usage": {},
        }
        experiments = MLExperiment.objects.all()
        self.assertEqual(len(experiments), 0)
        ml_experiment = self.request(
            "post",
            "/api/v1/{0}/{1}/ml_experiments".format(self.org1, project.id),
            payload,
            token,
            201,
        )
        experiments = MLExperiment.objects.all()
        self.assertEqual(len(experiments), 1)
        self.assertEqual(ml_experiment["title"], payload["title"])
