from rest_framework import routers
from .api import TaskViewSet, ProjectViewSet

router = routers.DefaultRouter()
router.register('api/tasks', TaskViewSet, "tasks")
router.register('api/projects', ProjectViewSet, "projects")

urlpatterns = router.urls
