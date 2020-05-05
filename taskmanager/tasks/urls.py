from rest_framework import routers
from .api import TaskViewSet, ProjectViewSet, ProjectSectionViewSet

router = routers.DefaultRouter()
router.register('api/tasks', TaskViewSet, "tasks")
router.register('api/projects', ProjectViewSet, "projects")
router.register('api/projectSections',
                ProjectSectionViewSet, 'projectSections')

urlpatterns = router.urls
