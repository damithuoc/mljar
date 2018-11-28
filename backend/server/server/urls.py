from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include

from apps.accounts.urls import urlpatterns as accounts_urlpatterns
from apps.projects.urls import urlpatterns as projects_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += accounts_urlpatterns
urlpatterns += projects_urlpatterns

from storage.basic_storage_views import FileUploadView, FileUploadDestinationView

urlpatterns += [
    url(r'^(?P<organization_slug>.+)/(?P<destination>.+)/(?P<filename>.+)/upload$', FileUploadView.as_view()),
    url(r'^(?P<organization_slug>.+)/(?P<project_id>.+)/(?P<filename>.+)/upload_destination$', FileUploadDestinationView.as_view()),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    # Serve static and media files from development server
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = 'MLJAR Admin'
