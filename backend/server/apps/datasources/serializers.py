from rest_framework import serializers
from apps.datasources import models


class FileDataSourceSerializer(serializers.ModelSerializer):
    created_by_username = serializers.ReadOnlyField(source='created_by.username')

    class Meta:
        model = models.FileDataSource
        read_only_fields = (
            "id",
            "created_by",
            "created_at",
            "updated_at",
            "parent_organization",
            "parent_project",
            "created_by_username"
        )
        fields = (
            "id",
            "title",
            "description",
            "absolute_path",
            "file_name",
            "file_size",
            "created_at",
            "updated_at",
            "created_by",
            "parent_organization",
            "parent_project",
            "created_by_username"
        )
