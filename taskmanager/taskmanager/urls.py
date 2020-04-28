from django.contrib import admin
from django.urls import path, include
from task import urls as taskurls
admin.autodiscover()

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', include(taskurls)),
]
