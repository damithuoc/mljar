from django.conf.urls import url, include

from datasources.views import MLExperimentViewSet
from datasources.views import MLModelViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)
router.register(
    r"(?P<organization_slug>.+)/(?P<project_id>.+)/ml_experiments",
    MLExperimentViewSet,
    base_name="ml_experiments",
)

router.register(
    r"(?P<organization_slug>.+)/(?P<project_id>.+)/ml_models",
    MLModelViewSet,
    base_name="ml_models",
)

urlpatterns = [url(r"^api/", include(router.urls))]
