from tasks.models import Task, Project, ProjectSection
from rest_framework import viewsets, permissions
from .serializers import taskserializer, projectserializer, projectsectionserializer

# Task viewset


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = taskserializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = projectserializer


class ProjectSectionViewSet(viewsets.ModelViewSet):
    queryset = ProjectSection.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = projectsectionserializer
