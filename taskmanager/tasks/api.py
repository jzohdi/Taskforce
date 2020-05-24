from tasks.models import (
    SubTask,
    Task,
    SectionList,
    ProjectNotes,
    Project,
    ProjectSection)
from rest_framework import viewsets, permissions
from .serializers import (
    subtaskserializer,
    taskserializer,
    sectionlistserializer,
    projectnotesserializer,
    projectserializer,
    projectsectionserializer)
from rest_framework.response import Response
from rest_framework import status
# Task viewset


class SubTaskViewSet(viewsets.ModelViewSet):
    queryset = SubTask.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = subtaskserializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = taskserializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()


class SectionListViewSet(viewsets.ModelViewSet):
    queryset = SectionList.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = sectionlistserializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()


class ProjectNotesViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = projectnotesserializer

    def get_queryset(self):
        return ProjectNotes.objects.all().order_by("-created_at")


class ProjectViewSet(viewsets.ModelViewSet):
    # queryset = Project.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = projectserializer

    def get_queryset(self):
        project_id = self.request.query_params.get('id', None)
        if project_id is not None:
            return self.request.user.projects.filter(id=project_id)
        return self.request.user.projects.all()

    def create(self, request, *args, **kwargs):
        check_exists = len(Project.objects.filter(
            title=request.data["title"]).filter(owner=self.request.user)) > 0
        if check_exists:
            return Response({"data": ["Task name already exists"]}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProjectSectionViewSet(viewsets.ModelViewSet):
    queryset = ProjectSection.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = projectsectionserializer
