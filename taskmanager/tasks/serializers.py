from rest_framework import serializers
from tasks.models import Task, Project, ProjectSection


class taskserializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class projectserializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class projectsectionserializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectSection
        fields = '__all__'
