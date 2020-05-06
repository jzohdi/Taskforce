from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("project/<int:project_id>", views.project)
]
