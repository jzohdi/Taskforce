from rest_framework import routers
from .api import (
    SubTaskViewSet,
    TaskViewSet,
    SectionListViewSet,
    ProjectNotesViewSet,
    ProjectViewSet,
    ProjectSectionViewSet,
    AddMemberViewSet)
from django.urls import path
from .views import add_member

router = routers.DefaultRouter()
router.register('api/subtasks', SubTaskViewSet, "subtasks")
router.register('api/tasks', TaskViewSet, "tasks")
router.register('api/sectionlists', SectionListViewSet, "sectionlists")
# router.register('api/projectdata/<int:project_id>', )
router.register('api/projectnotes', ProjectNotesViewSet, 'projectnotes')
router.register('api/projects', ProjectViewSet, "projects")
router.register('api/projectSections',
                ProjectSectionViewSet, 'projectSections')
router.register("api/members", AddMemberViewSet, "add_member")
urlpatterns = router.urls
# urlpatterns.append(path("api/add_member", AddMemberViewSet, "add_member"))
