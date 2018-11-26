import os
import unittest
import requests


class TestBase(unittest.TestCase):

    def get_server_url(self):
        return os.environ.get("SERVER_URL", "http://0.0.0.0:8000")

    def create_user_and_login(self):
        data = {
            "username": "piotrek",
            "email": "piotrek@piotrek.pl",
            "password": "verysecret",
            "organization": "big co",
        }
        r = requests.post(self.get_server_url() + "/users/create", json=data)
        # if r.status_code == 400:
        #    if 'email' in r.json():
        #        # user already exists
        # self.assertEqual(r.status_code, 201)
        r = requests.post(self.get_server_url() + "/auth/token/login", json=data)
        self.assertEqual(r.status_code, 200)

        self.token = r.json().get("auth_token")

        return self.token
