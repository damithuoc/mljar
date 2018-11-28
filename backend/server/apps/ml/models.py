from django.db import models
from django.contrib.postgres.fields import JSONField

from django.utils.timezone import now
from accounts.models import MljarUser, MljarOrganization
from projects.models import Project

from common.fields import AutoCreatedField
from common.fields import AutoLastModifiedField


class Experiment(models.Model):

    title = models.TextField()
    description = models.TextField(blank=True, null=True)

    params = JSONField(blank=True, null=True)
    column_usage = JSONField(blank=True, null=True)
    column_usage = JSONField(blank=True, null=True)


    created_at = AutoCreatedField()
    updated_at = AutoLastModifiedField()

    created_by = models.ForeignKey(MljarUser, on_delete=models.CASCADE)
    parent_organization = models.ForeignKey(MljarOrganization, on_delete=models.CASCADE)
    parent_project = models.ForeignKey(Project, on_delete=models.CASCADE)
