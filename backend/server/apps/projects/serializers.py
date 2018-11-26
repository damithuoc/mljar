from rest_framework import serializers
import projects.models as models


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Project
        read_only_fields = ('id', 'created_by')
        fields = ('id', 'title', 'description', 'created_at', 'updated_at',
                    'created_by', 'parent_organization')
        extra_kwargs = {
            'parent_organization': {'write_only': True}
        }
