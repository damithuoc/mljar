import os
import uuid
from rest_framework import views, status
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework import status

from apps.common.permissions import IsAuthenticatedAndFromOrganization

from storage.storage import Storage


class FileUploadView(views.APIView):
    parser_classes = (FileUploadParser,)
    permission_classes = (IsAuthenticatedAndFromOrganization,)

    def put(self, request, organization_slug, destination, filename, format=None):
        file_obj = request.data["file"]
        print("FileUploadView put", filename)
        print("obj", file_obj.size / 1024 / 1024, type(file_obj))

        storage = Storage()
        path = storage.get_path(destination, filename)
        with open(path, "wb+") as fout:
            for chunk in file_obj.chunks():
                fout.write(chunk)

        return Response(status=status.HTTP_201_CREATED)


class FileUploadDestinationView(views.APIView):
    permission_classes = (IsAuthenticatedAndFromOrganization,)

    def get(self, request, organization_slug, project_id, filename, format=None):

        destination = "org_{0}_proj_{1}".format(organization_slug, project_id)
        filename = "input-{0}-{1}".format(filename, str(uuid.uuid4())[:8])

        return Response(
            {"destination": destination, "filename": filename, "storage_type": "basic"}
        )
