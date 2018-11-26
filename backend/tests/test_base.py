import os
import unittest
import requests


class TestBase(unittest.TestCase):

    user1_params = {
            "username": "piotrek",
            "email": "piotrek@piotrek.pl",
            "password": "verysecret",
            "organization": "big co",
        }
    user2_params = {
            "username": "piotrek2",
            "email": "piotrek2@piotrek2.pl",
            "password": "verysecret2",
            "organization": "big co2",
        }

    def get_server_url(self):
        return os.environ.get("SERVER_URL", "http://0.0.0.0:8000")

    def create_user_and_login(self, payload):
        r = requests.post(self.get_server_url() + "/users/create", json=payload)
        #if r.status_code != 204:
        #    print(r.status_code, r.text)
        # we are not checking here the response status code, because maybe user already exists in db
        r = requests.post(self.get_server_url() + "/auth/token/login", json=payload)
        if r.status_code != 200:
            print(r.text)
        self.assertEqual(r.status_code, 200)
        token = r.json().get("auth_token")
        return token

    def request(self, method, endpoint, payload, token, expected_status_code = 200):
        headers = {"Authorization": "Token " + token} if token else {}
        if method.lower() == 'post':
            r = requests.post(
                self.get_server_url() + endpoint, json=payload, headers=headers
            )
        else:
            r = requests.get(
                self.get_server_url() + endpoint, headers=headers
            )
        if r.status_code != expected_status_code:
            print(r.text)
        self.assertEqual(r.status_code, expected_status_code)
        if expected_status_code == 200:
            return r.json()
