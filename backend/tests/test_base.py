import os
import sys
import unittest
import requests


BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERVER_DIR = os.path.join(BACKEND_DIR, "server")
sys.path.insert(0, SERVER_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
import django

django.setup()

from accounts.models import MljarUser, MljarOrganization, MljarMembership
from projects.models import Project


class TestBase(unittest.TestCase):
    def setUp(self):
        for d in [MljarMembership, MljarUser, MljarOrganization, Project]:
            d.objects.all().delete()

    def tearDown(self):
        pass

    org1 = "big-co"  # slug for organization #1
    user1_params = {
        "username": "piotrek",
        "email": "piotrek@piotrek.pl",
        "password": "verysecret",
        "organization": "big co",
    }
    org2 = "big-co2"  # slug for organization #2
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
        # if r.status_code != 204:
        #    print(r.status_code, r.text)
        # we are not checking here the response status code, because maybe user already exists in db
        r = requests.post(self.get_server_url() + "/auth/token/login", json=payload)
        if r.status_code != 200:
            print(r.text)
        self.assertEqual(r.status_code, 200)
        token = r.json().get("auth_token")
        return token

    def request(self, method, endpoint, payload, token, expected_status_code=200):
        headers = {"Authorization": "Token " + token} if token else {}
        if method.lower() == "post":
            r = requests.post(
                self.get_server_url() + endpoint, json=payload, headers=headers
            )
        elif method.lower() == "delete":
            r = requests.delete(self.get_server_url() + endpoint, headers=headers)
        elif method.lower() == "put":
            r = requests.delete(self.get_server_url() + endpoint, headers=headers)
        else:
            r = requests.get(self.get_server_url() + endpoint, headers=headers)
        if r.status_code != expected_status_code:
            print(r.text)
        self.assertEqual(r.status_code, expected_status_code)
        if expected_status_code in [200, 201]:
            return r.json()
