from rest_framework import serializers
import apps.projects.models as models
from apps.datasources.models import FileDataSource
from apps.datasources.models import DataFrame
from apps.ml.models import MLExperiment

class ProjectSerializer(serializers.ModelSerializer):
    created_by_username = serializers.ReadOnlyField(source="created_by.username")

    datasources_cnt = serializers.SerializerMethodField(read_only=True)
    dataframes_cnt = serializers.SerializerMethodField(read_only=True)
    experiments_cnt = serializers.SerializerMethodField(read_only=True)

    def get_datasources_cnt(self, project):
        return FileDataSource.objects.filter(parent_project=project).count()

    def get_dataframes_cnt(self, project):
        return DataFrame.objects.filter(parent_project=project).count()

    def get_experiments_cnt(self, project):
        return MLExperiment.objects.filter(parent_project=project).count()

    class Meta:
        model = models.Project
        read_only_fields = (
            "id",
            "created_by",
            "created_at",
            "updated_at",
            "parent_organization",
            "created_by_username",
            "datasources_cnt",
            "dataframes_cnt",
            "experiments_cnt"
        )
        fields = (
            "id",
            "title",
            "description",
            "created_at",
            "updated_at",
            "created_by",
            "parent_organization",
            "created_by_username",
            "datasources_cnt",
            "dataframes_cnt",
            "experiments_cnt"
        )
