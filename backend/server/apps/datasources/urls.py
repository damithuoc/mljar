from django.conf.urls import url, include

from datasources.views import FileDataSourceViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)
router.register(
    r"(?P<organization_slug>.+)/file_sources", FileDataSourceViewSet, base_name="file_sources"
)

urlpatterns = [url(r"^api/", include(router.urls))]