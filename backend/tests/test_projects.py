import unittest
import requests
import copy
from test_base import TestBase


class TestProjects(TestBase):
    def test_create_project(self):
        token = self.create_user_and_login(self.user1_params)
        # should be empty
        projects = self.request(
            "get", "/api/{0}/projects".format(self.org1), {}, token, 200
        )
        self.assertEqual(len(projects), 0)
        # add project #1
        payload = {"title": "New project", "description": "Completely new"}
        project = self.request(
            "post", "/api/{0}/projects".format(self.org1), payload, token, 201
        )
        self.assertEqual(payload["title"], project["title"])
        projects = self.request(
            "get", "/api/{0}/projects".format(self.org1), {}, token, 200
        )
        self.assertEqual(len(projects), 1)  # should be 1
        # add project #2
        project = self.request(
            "post", "/api/{0}/projects".format(self.org1), payload, token, 201
        )
        self.assertEqual(payload["title"], project["title"])
        projects = self.request(
            "get", "/api/{0}/projects".format(self.org1), {}, token, 200
        )
        self.assertEqual(len(projects), 2)  # should be 2

    def test_project_access(self):
        token1 = self.create_user_and_login(self.user1_params)
        token2 = self.create_user_and_login(self.user2_params)
        # add project #1 user1
        payload1 = {"title": "New project", "description": "Completely new"}
        project1 = self.request(
            "post", "/api/{0}/projects".format(self.org1), payload1, token1, 201
        )
        # add project #1 user2
        payload2 = {"title": "New project 2", "description": "Completely new 2"}
        project2 = self.request(
            "post", "/api/{0}/projects".format(self.org2), payload2, token2, 201
        )
        # list user1 projects
        projects = self.request(
            "get", "/api/{0}/projects".format(self.org1), {}, token1, 200
        )
        self.assertEqual(len(projects), 1)  # should be 1
        # try to access user2 projects with user1 token, should return HTTP 403
        self.request("get", "/api/{0}/projects".format(self.org2), {}, token1, 403)
        # access user2 project by its id from user1 token
        self.request(
            "get",
            "/api/{0}/projects/{1}".format(self.org2, project2["id"]),
            {},
            token1,
            403,
        )

    def test_project_details(self):
        token = self.create_user_and_login(self.user1_params)
        # add project
        payload = {"title": "New project", "description": "Completely new"}
        project = self.request(
            "post", "/api/{0}/projects".format(self.org1), payload, token, 201
        )
        # get project details
        project_details = self.request(
            "get",
            "/api/{0}/projects/{1}".format(self.org1, project["id"]),
            payload,
            token,
            200,
        )
        self.assertEqual(project["id"], project_details["id"])

    def test_project_update(self):
        """
        token = self.create_user_and_login(self.user1_params)
        # add project
        payload1 = {"title": "New project", "description": "Completely new"}
        project = self.request(
            "post", "/api/{0}/projects".format(self.org1), payload1, token1, 201
        )
        # list projects
        projects = self.request(
            "get", "/api/{0}/projects".format(self.org1), {}, token1, 200
        )
        self.assertEqual(len(projects), 1)  # should be 1
        # delete project
        projects = self.request(
            "get", "/api/{0}/projects".format(self.org1), {}, token1, 200
        )
        """

    def test_project_delete(self):
        token = self.create_user_and_login(self.user1_params)
        # add project
        payload = {"title": "New project", "description": "Completely new"}
        project = self.request(
            "post", "/api/{0}/projects".format(self.org1), payload, token, 201
        )
        # delete project
        self.request(
            "delete",
            "/api/{0}/projects/{1}".format(self.org1, project["id"]),
            payload,
            token,
            204,
        )
        # list projects, should be empty
        projects = self.request(
            "get", "/api/{0}/projects".format(self.org1), {}, token, 200
        )
        self.assertEqual(len(projects), 0)
        # try to get project details
        self.request(
            "get",
            "/api/{0}/projects/{1}".format(self.org1, project["id"]),
            {},
            token,
            404,
        )
