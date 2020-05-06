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
    # queryset = Project.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = projectserializer

    def get_queryset(self):
        return self.request.user.projects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProjectSectionViewSet(viewsets.ModelViewSet):
    queryset = ProjectSection.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = projectsectionserializer
