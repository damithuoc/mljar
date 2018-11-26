import os
import unittest
import requests

from test_base import TestBase

class TestAccounts(TestBase):


    def test_create_user(self):
        token = self.create_user_and_login()
