import requests
import copy
from test_base import TestBase


class TestBasicUpload(TestBase):

    def test_upload(self):
        """
        Uploads sample file to basic storage.
        """
        token = self.create_user_and_login(self.user1_params)
        headers = {"Authorization": "Token " + token}
        # add project #1
        payload = {"title": "New project", "description": "Completely new"}
        project = self.request(
            "post", "/api/{0}/projects".format(self.org1), payload, token, 201
        )
        r = requests.get(
            "{0}/api/{1}/{2}/{3}/upload_destination".format(
                self.get_server_url(), self.org1, project["id"], "test.txt"
            ),
            headers=headers,
        )
        destination = r.json()["destination"]
        filename = r.json()["filename"]

        path = "/tmp/test_file.txt"
        f = open(path, "w")
        for i in range(1):
            f.write("test12345\n")
        f.close()
        with open(path, "rb") as fin:
            r = requests.put(
                "{0}/api/{1}/{2}/{3}/upload".format(
                    self.get_server_url(), self.org1, destination, filename
                ),
                data=fin.read(),
                headers=headers
            )
            self.assertEqual(r.status_code, 201)
