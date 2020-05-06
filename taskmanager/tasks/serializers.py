from rest_framework import serializers
from tasks.models import Task, Project, ProjectSection
from rest_framework.response import Response


class taskserializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class projectsectionserializer(serializers.ModelSerializer):

    tasks = taskserializer(many=True, read_only=True)

    class Meta:
        model = ProjectSection
        fields = '__all__'


class projectserializer(serializers.ModelSerializer):

    sections = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'

    def create(self, validated_data):
        check_exists = len(Project.objects.filter(
            title=validated_data["title"])) > 0
        if check_exists:
            return Response({"error": True, "message": "project name already exists"})
        new_project = Project.objects.create(**validated_data)
        ProjectSection.objects.create(name="main", project=new_project)
        return new_project
