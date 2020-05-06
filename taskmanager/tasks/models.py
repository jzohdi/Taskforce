from django.db import models

# Create your models here.


class Project(models.Model):
    title = models.CharField(max_length=100, blank=False, unique=True)
    background = models.CharField(max_length=50, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class ProjectSection(models.Model):
    project = models.ForeignKey(
        Project,
        related_name="sections",
        on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=False)

    def __str__(self):
        return self.name


class Task(models.Model):
    project_section = models.ForeignKey(
        ProjectSection,
        related_name="tasks",
        on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
