from django.contrib import admin
from django.urls import path, include
from tasks import urls as tasksurls
admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include(tasksurls)),
]
