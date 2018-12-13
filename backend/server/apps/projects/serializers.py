from rest_framework import serializers
import apps.projects.models as models




class ProjectSerializer(serializers.ModelSerializer):
    created_by_username = serializers.ReadOnlyField(source='created_by.username')

    class Meta:
        model = models.Project
        read_only_fields = (
            "id",
            "created_by",
            "created_at",
            "updated_at",
            "parent_organization",
            "created_by_username"
        )
        fields = (
            "id",
            "title",
            "description",
            "created_at",
            "updated_at",
            "created_by",
            "parent_organization",
            "created_by_username"
        )
