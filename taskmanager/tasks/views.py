from django.shortcuts import render
from tasks.models import Project
# Create your views here.


def project_id(request, project_id):
    return Project.objects.get(id=project_id)
