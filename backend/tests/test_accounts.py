import requests
import copy
from test_base import TestBase


class TestAccounts(TestBase):
    def test_create_user(self):
        token = self.create_user_and_login(self.user1_params)
        self.assertTrue(token is not None)

    def test_get_organizations(self):
        token1 = self.create_user_and_login(self.user1_params)
        token2 = self.create_user_and_login(self.user2_params)

        organizations1 = self.request("get", "/user/organization", {}, None, 401)
        organizations1 = self.request("get", "/user/organization", {}, token1, 200)
        self.assertEqual(len(organizations1), 1)
        self.assertEqual(organizations1[0]["slug"], "big-co")

        organizations2 = self.request("get", "/user/organization", {}, token2, 200)
        self.assertEqual(len(organizations2), 1)
        self.assertEqual(organizations2[0]["slug"], "big-co2")

    def test_delete_user(self):
        token = self.create_user_and_login(self.user1_params)
        params = {"current_password": self.user1_params["password"]}
        self.request("post", "/users/delete", params, token, 204)
        # self.request('post', '/users/delete', params, token, 404)
