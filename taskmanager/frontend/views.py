from django.shortcuts import render


def index(request):
    return render(request, "frontend/index.html")


def project(request, project_id):
    print(project_id)
    return render(request, "frontend/project.html")
