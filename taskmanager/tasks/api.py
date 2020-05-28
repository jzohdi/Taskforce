from tasks.models import (
    SubTask,
    Task,
    SectionList,
    ProjectNotes,
    Project,
    ProjectSection,
    UserProjectMapping)
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
from django.http import JsonResponse
from django.core import serializers
from json import loads
from django.contrib.auth.models import User
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
        username = self.request.user.username
        perms = UserProjectMapping.objects.get(username=username).project.all()
        user_projects = self.request.user.projects.all()
        return (perms | user_projects).distinct()

    def create(self, request, *args, **kwargs):
        check_exists = len(Project.objects.filter(
            title=request.data["title"]).filter(owner=self.request.user)) > 0
        if check_exists:
            return Response({"data": ["Task name already exists"]}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project = self.perform_create(serializer)
        UserProjectMapping.objects.get(
            username=self.request.user.username).project.add(project)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)


class ProjectSectionViewSet(viewsets.ModelViewSet):
    queryset = ProjectSection.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = projectsectionserializer


class AddMemberViewSet(viewsets.ViewSet):
    # queryset = Project.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def list(self, request):
        mapping = UserProjectMapping.objects.get(
            username=request.user.username)
        mapping = loads(serializers.serialize("json", [mapping, ]))
        return JsonResponse({"data": [mapping]}, status=200)

    def create(self, request):
        project = request.data.get("project", None)
        if not project:
            return JsonResponse({"error": "project field required"}, status=400)
        username = request.data.get("username", None)
        if not username:
            return JsonResponse({"error": "username field required"}, status=400)
        if Project.objects.filter(id=project).count() == 0:
            return JsonResponse({"error": f"project {project} does not exist."}, status=400)
        if User.objects.filter(username=username).count() == 0:
            return JsonResponse({"error": f"user {username} does not exist."}, status=400)
        db_project = Project.objects.get(id=project)
        if db_project.owner != request.user:
            return JsonResponse({"error": "Unauthorized to add members to this project"}, status=400)
        # check if user already in permissions
        if UserProjectMapping.objects.get(username=username).project.filter(id=project).count() != 0:
            return JsonResponse({"error": "User already added to project."}, status=400)
        UserProjectMapping.objects.get(
            username=username).project.add(db_project)
        return JsonResponse({"data": f"{username} added"}, status=200)

    def retrieve(self, request, pk=None):
        if Project.objects.filter(id=pk).count() == 0:
            return JsonResponse({"error": "Invalid project"}, status=400)
        members = UserProjectMapping.objects.filter(project=16)
        members = [member.username for member in members]
        return JsonResponse({"data": members}, status=200)

    def update(self, request, pk=None):
        return JsonResponse({"data": "list endpoint"}, status=200)

    def partial_update(self, request, pk=None):
        return JsonResponse({"data": "Invalid method"}, status=503)

    def destroy(self, request, pk=None):
        return JsonResponse({"data": "list endpoint"}, status=200)
