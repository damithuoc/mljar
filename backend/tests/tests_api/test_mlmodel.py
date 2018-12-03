import unittest
import requests
import copy
from test_base import TestBase

from projects.models import Project
from ml.models import MLExperiment
from ml.models import MLModel
from accounts.models import MljarUser, Organization


class TestMLModel(TestBase):
    def test_create_mlmodel(self):
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

        ml_experiment = MLExperiment(
            title="exp1",
            description="desc",
            params={},
            column_usage={},
            created_by=user,
            parent_organization=organization,
            parent_project=project,
        )
        ml_experiment.save()

        ml_model = MLModel(
            model_key="exp1",
            created_by=user,
            parent_organization=organization,
            parent_project=project,
            parent_experiment=ml_experiment,
            model_type="some_ml_model",
            params={},
            training_details={},
            training_time=1,
            metric={},
            status="created",
            errors={},
            task_id="",
        )
        ml_model.save()

        self.assertEqual(len(MLModel.objects.all()), 1)
        # POST on MLModels is not allowed (HTTP 405)
        ml_model = self.request(
            "post",
            "/api/v1/{0}/{1}/ml_models".format(self.org1, project.id),
            {},
            token,
            405,
        )
        ml_models = self.request(
            "get",
            "/api/v1/{0}/{1}/ml_models".format(self.org1, project.id),
            {},
            token,
            200,
        )
        self.assertEqual(len(ml_models), 1)
        self.assertEqual(ml_models[0]["model_key"], "exp1")
