from django.db import models

# Create your models here.


class Task(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    project_id = models.BigIntegerField(blank=False)
    section_id = models.BigIntegerField(blank=False)


class Project(models.Model):
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
