from django.conf.urls import url, include

from datasources.views import FileDataSourceViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)
router.register(
    r"(?P<organization_slug>.+)/(?P<project_id>.+)/file_sources",
    FileDataSourceViewSet,
    basename="file_sources",
)

urlpatterns = [url(r"^api/v1/", include(router.urls))]
