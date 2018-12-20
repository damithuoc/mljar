import time
import copy

from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.datasources.models import FileDataSource, DataFrame
from apps.datasources.serializers import FileDataSourceSerializer, DataFrameSerializer

from django.db import transaction

from rest_framework.exceptions import APIException
from rest_framework import permissions
from apps.common.permissions import IsAuthenticatedAndFromOrganization
from apps.accounts.models import Organization
from apps.datasources.models import DataFrame
from worker import consumer

from storage.storage import Storage


class GetDataFramePreview(APIView):
    permission_classes = (IsAuthenticatedAndFromOrganization,)

    def get(self, request, organization_slug, project_id, dataframe_id, format=None):
        print("Get DataFrame", organization_slug, project_id, dataframe_id)

        try:
            dataframe = DataFrame.objects.get(
                parent_organization__slug=organization_slug,
                parent_project__id=project_id,
                pk=dataframe_id,
            )
            print("dataframe", dataframe.preview_absolute_path)
            # TODO add reading from Storage abstraction
            if dataframe.preview_absolute_path is None:
                return Response(status=status.HTTP_404_NOT_FOUND)
            preview_data = None
            with open(dataframe.preview_absolute_path, "r") as fin:
                preview_data = fin.read()
            return Response(
                {
                    "source_title": dataframe.source.title,
                    "preview_data": preview_data,
                    "columns_description": dataframe.columns_details.get(
                        "columns_description"
                    ),
                    "nrows": dataframe.columns_details.get("nrows"),
                    "ncols": dataframe.columns_details.get("ncols"),
                }
            )

        except DataFrame.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(str(e), status=status.HTTP_404_NOT_FOUND)


class FileDataSourceViewSet(ModelViewSet):

    serializer_class = FileDataSourceSerializer
    queryset = FileDataSource.objects.all()
    permission_classes = (IsAuthenticatedAndFromOrganization,)

    def get_queryset(self):
        organization_slug = self.kwargs.get("organization_slug")
        project_id = self.kwargs.get("project_id")
        return self.queryset.filter(
            parent_organization__slug=organization_slug, parent_project__id=project_id
        )

    def perform_create(self, serializer):
        print("file data source create")
        organization_slug = self.kwargs.get("organization_slug")
        project_id = self.kwargs.get("project_id")
        try:
            with transaction.atomic():
                instance = serializer.save(
                    created_by=self.request.user,
                    parent_organization=Organization.objects.get(
                        slug=organization_slug
                    ),
                    parent_project_id=project_id,
                )
                job_params = copy.deepcopy(
                    serializer.validated_data
                )  # dont want to see db_id in returned params
                job_params["db_id"] = instance.id
                job_params["created_by_id"] = instance.created_by.id
                job_params["parent_organization_id"] = instance.parent_organization.id
                job_params["parent_project_id"] = instance.parent_project.id
                transaction.on_commit(
                    lambda: consumer.ReadUploadedFileTask.delay(job_params)
                )
        except Exception as e:
            raise APIException(str(e))

    def perform_destroy(self, instance):
        print("destroy")
        try:
            with transaction.atomic():
                instance.delete()
        except Exception as e:
            raise APIException(str(e))


class DataFrameViewSet(RetrieveModelMixin, ListModelMixin, GenericViewSet):
    serializer_class = DataFrameSerializer
    queryset = DataFrame.objects.all()
    permission_classes = (IsAuthenticatedAndFromOrganization,)

    def get_queryset(self):
        organization_slug = self.kwargs.get("organization_slug")
        project_id = self.kwargs.get("project_id")
        return self.queryset.filter(
            parent_organization__slug=organization_slug, parent_project__id=project_id
        )
