import os
import copy
import requests
from test_base import TestBase


class TestFileDataSource(TestBase):

    def test_create(self):
        token = self.create_user_and_login(self.user1_params)
        headers = {"Authorization": "Token " + token}
        # add project
        payload = {"title": "New project", "description": "Completely new"}
        project = self.request(
            "post", "/api/{0}/projects".format(self.org1), payload, token, 201
        )

    def test_delete(self):
        pass
    def test_edit(self):
        pass
