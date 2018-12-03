from django.db import models
from django.contrib.postgres.fields import JSONField

from django.utils.timezone import now
from apps.accounts.models import MljarUser, Organization

from apps.common.fields import AutoCreatedField
from apps.common.fields import AutoLastModifiedField


class Project(models.Model):

    title = models.TextField()
    description = models.TextField(blank=True, null=True)

    created_at = AutoCreatedField()
    updated_at = AutoLastModifiedField()

    created_by = models.ForeignKey(MljarUser, on_delete=models.CASCADE)
    parent_organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
