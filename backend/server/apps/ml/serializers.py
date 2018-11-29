from rest_framework import serializers
from ml.models import MLExperiment, MLModel


class MLExperimentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MLExperiment
        read_only_fields = (
            "id",
            "created_by",
            "created_at",
            "updated_at",
            "parent_organization",
            "parent_project",
            "status",
            "errors",
        )
        fields = (
            "id",
            "created_by",
            "created_at",
            "updated_at",
            "parent_organization",
            "parent_project",
            "title",
            "description",
            "params",
            "column_usage",
            "status",
            "errors",
        )
