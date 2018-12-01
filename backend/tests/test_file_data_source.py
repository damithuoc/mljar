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
            "post", "/api/v1/{0}/projects".format(self.org1), payload, token, 201
        )
        # list file sources, should be empty
        file_sources = self.request(
            "get",
            "/api/v1/{0}/{1}/file_sources".format(self.org1, project["id"]),
            {},
            token,
            200,
        )
        self.assertEqual(len(file_sources), 0)
        # add data source (without upload !!!)
        payload = {
            "title": "new file",
            "description": "a new file for training",
            "file_path": "a",
            "file_size": 1,
            "file_name": "train.txt",
        }
        file_source = self.request(
            "post",
            "/api/v1/{0}/{1}/file_sources".format(self.org1, project["id"]),
            payload,
            token,
            201,
        )
        self.assertEqual(file_source["title"], payload["title"])

        file_sources = self.request(
            "get",
            "/api/v1/{0}/{1}/file_sources".format(self.org1, project["id"]),
            {},
            token,
            200,
        )
        self.assertEqual(len(file_sources), 1)

    """
    def test_delete(self):
        pass

    def test_edit(self):
        pass
    """
