from django.shortcuts import render
from tasks.models import Project
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

# Create your views here.


def project_id(request, project_id):
    return Project.objects.get(id=project_id)


def add_member(request):
    if request.method == "POST":
        print(request.POST)
        print(request.user)
        return JsonResponse({"data": "got here"}, status=status.HTTP_202_ACCEPTED)
    return JsonResponse({"error": "Request method not supported"}, status=status.HTTP_400_BAD_REQUEST)
