from rest_framework import routers
from .api import (
    SubTaskViewSet,
    TaskViewSet,
    SectionListViewSet,
    ProjectNotesViewSet,
    ProjectViewSet,
    ProjectSectionViewSet)

router = routers.DefaultRouter()
router.register('api/subtasks', SubTaskViewSet, "subtasks")
router.register('api/tasks', TaskViewSet, "tasks")
router.register('api/sectionlists', SectionListViewSet, "sectionlists")
# router.register('api/projectdata/<int:project_id>', )
router.register('api/projectnotes', ProjectNotesViewSet, 'projectnotes')
router.register('api/projects', ProjectViewSet, "projects")
router.register('api/projectSections',
                ProjectSectionViewSet, 'projectSections')

urlpatterns = router.urls
