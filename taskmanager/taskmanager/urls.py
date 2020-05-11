from django.contrib import admin
from django.urls import path, include, re_path
from frontend.views import index
admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('tasks.urls')),
    path('', include('accounts.urls')),
    re_path(r'/*', index)
]
