import os
import unittest
import requests

from test_base import TestBase

class TestAccounts(TestBase):

    def test_create_user(self):
        token = self.create_user_and_login(self.user1_params)
        self.assertTrue(token is not None)

    def test_get_organizations(self):
        token1 = self.create_user_and_login(self.user1_params)
        token2 = self.create_user_and_login(self.user2_params)

        organizations1 = self.request('get', '/user/organization', {}, None, 401)

        organizations1 = self.request('get', '/user/organization', {}, token1, 200)
        print(organizations1)
