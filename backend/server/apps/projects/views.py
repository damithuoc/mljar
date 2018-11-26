from rest_framework import viewsets
from projects.models import Project
from projects.serializers import ProjectSerializer

from django.db import transaction

from rest_framework.exceptions import APIException
from rest_framework import permissions
import time
import copy



class ProjectViewSet(viewsets.ModelViewSet):

    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return Project.objects.all()

    def perform_create(self, serializer):
        try:
            with transaction.atomic():
                instance = serializer.save(
                    state="CREATED", created_by=self.request.user
                )
        except Exception as e:
            raise APIException(str(e))

    def perform_destroy(self, instance):
        try:
            with transaction.atomic():
                instance.delete()
        except Exception as e:
            raise APIException(str(e))
