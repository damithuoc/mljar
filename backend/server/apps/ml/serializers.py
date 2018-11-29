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


class MLModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MLModel
        read_only_fields = (
            "id",
            "created_by",
            "created_at",
            "updated_at",
            "parent_organization",
            "parent_project",
            "parent_experiment",
            "status",
            "errors",
            "model_key",
            "model_type",
            "params",
            "training_details",
            "training_time",
            "metric",
            "status",
            "task_id",
        )
        fields = read_only_fields
