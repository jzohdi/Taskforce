from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Project(models.Model):
    title = models.CharField(max_length=100, blank=False)
    background = models.CharField(max_length=50, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User,
                              related_name="projects", on_delete=models.CASCADE,
                              null=True)

    def __str__(self):
        return self.title


class ProjectNotes(models.Model):
    project = models.ForeignKey(
        Project,
        related_name="notes",
        on_delete=models.CASCADE
    )
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class ProjectSection(models.Model):
    project = models.ForeignKey(
        Project,
        related_name="sections",
        on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=False)

    def __str__(self):
        return self.name


class SectionList(models.Model):
    section = models.ForeignKey(
        ProjectSection,
        related_name="lists",
        on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=False)
    position = models.IntegerField(blank=True)

    def __str__(self):
        return self.name


class Task(models.Model):
    section_list = models.ForeignKey(
        SectionList,
        related_name="tasks",
        on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField(
        null=True, auto_now_add=False, blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    position = models.IntegerField(blank=True)

    def __str__(self):
        return self.name


class SubTask(models.Model):
    task = models.ForeignKey(
        Task,
        related_name="subtasks",
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=150, blank=False)
    completed = models.BooleanField(default=False)
