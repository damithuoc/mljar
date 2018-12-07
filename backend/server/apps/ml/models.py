from django.db import models
from django.contrib.postgres.fields import JSONField

from django.utils.timezone import now
from apps.accounts.models import MljarUser, Organization
from apps.projects.models import Project

from apps.common.fields import AutoCreatedField
from apps.common.fields import AutoLastModifiedField


class MLExperiment(models.Model):

    title = models.TextField()
    description = models.TextField(blank=True, null=True)

    # params must have:
    # - data_usage
    # - metric to be optimized
    # - validation
    #
    params = JSONField(blank=True, null=True)
    column_usage = JSONField(blank=True, null=True)

    statuses = (
        ("created", "Created"),
        ("started", "Started"),
        ("progress", "In progress"),
        ("done", "Done"),
        ("error", "Error"),
    )
    status = models.CharField(
        max_length=32, choices=statuses, default="created", blank=False
    )
    errors = JSONField(blank=True, null=True)

    task_id = models.CharField(max_length=128)  # worker task id

    created_at = AutoCreatedField()
    updated_at = AutoLastModifiedField()

    created_by = models.ForeignKey(MljarUser, on_delete=models.CASCADE)
    parent_organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    parent_project = models.ForeignKey(Project, on_delete=models.CASCADE)


class MLModel(models.Model):

    model_key = models.TextField(db_index=True)  # the key of the model (unique hash)

    created_at = AutoCreatedField()
    updated_at = AutoLastModifiedField()

    created_by = models.ForeignKey(MljarUser, on_delete=models.CASCADE)
    parent_organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    parent_project = models.ForeignKey(Project, on_delete=models.CASCADE)
    parent_experiment = models.ForeignKey(MLExperiment, on_delete=models.CASCADE)

    model_type = models.CharField(max_length=128, blank=False)
    params = JSONField(
        blank=True, null=True
    )  # ml model parameters (hyper-parameters + learning details)
    training_details = JSONField(
        blank=True, null=True
    )  # ml model training details, for example the learning curves
    training_time = models.IntegerField(blank=True, null=True)  # in seconds
    metric = JSONField(blank=True, null=True)  # metric

    statuses = (
        ("created", "Created"),
        ("started", "Started"),
        ("progress", "In progress"),
        ("done", "Done"),
        ("error", "Error"),
    )
    status = models.CharField(
        max_length=32, choices=statuses, default="created", blank=False
    )
    errors = JSONField(blank=True, null=True)

    task_id = models.CharField(max_length=128)  # worker task id
