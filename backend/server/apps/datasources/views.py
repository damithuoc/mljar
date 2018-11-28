import time
import copy

from rest_framework import viewsets
from datasources.models import FileDataSource
from datasources.serializers import FileDataSourceSerializer

from django.db import transaction

from rest_framework.exceptions import APIException
from rest_framework import permissions
from common.permissions import IsAuthenticatedAndFromOrganization
from accounts.models import MljarOrganization


class FileDataSourceViewSet(viewsets.ModelViewSet):

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
                    parent_organization = MljarOrganization.objects.get(
                        slug=organization_slug
                    ),
                    parent_project_id=project_id,
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
