from django.db import models
from django.contrib.postgres.fields import JSONField

from django.utils.timezone import now
from apps.accounts.models import MljarUser, Organization
from apps.projects.models import Project

from apps.common.fields import AutoCreatedField
from apps.common.fields import AutoLastModifiedField


class FileDataSource(models.Model):

    title = models.TextField()
    description = models.TextField(blank=True, null=True)

    storage_full_path = models.CharField(max_length=1024)  # full file path in storage
    file_name = models.CharField(max_length=256)  # file name from upload
    file_size = models.DecimalField(decimal_places=2, max_digits=10)  # in MB

    created_at = AutoCreatedField()
    updated_at = AutoLastModifiedField()

    created_by = models.ForeignKey(MljarUser, on_delete=models.CASCADE)
    parent_organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    parent_project = models.ForeignKey(Project, on_delete=models.CASCADE)

    # data_frame = models.ForeignKey(DataFrame, on_delete=models.CASCADE)


class DataFrame(models.Model):

    storage_full_path = models.CharField(max_length=1024)  # file path in storage

    created_at = AutoCreatedField()
    updated_at = AutoLastModifiedField()

    created_by = models.ForeignKey(MljarUser, on_delete=models.CASCADE)
    parent_organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    parent_project = models.ForeignKey(Project, on_delete=models.CASCADE)

    state = models.CharField(max_length=128)
    task_id = models.CharField(max_length=128)
