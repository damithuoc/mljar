from django.conf.urls import url, include

from apps.datasources.views import (
    FileDataSourceViewSet,
    DataFrameViewSet,
    GetDataFramePreview,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)
router.register(
    r"(?P<organization_slug>.+)/(?P<project_id>.+)/file_sources",
    FileDataSourceViewSet,
    basename="file_sources",
)
router.register(
    r"(?P<organization_slug>.+)/(?P<project_id>.+)/dataframes",
    DataFrameViewSet,
    basename="dataframes",
)

urlpatterns = [
    url(r"^api/v1/", include(router.urls)),
    url(
        r"^api/v1/(?P<organization_slug>.+)/(?P<project_id>.+)/frame_preview/(?P<dataframe_id>.+)",
        GetDataFramePreview.as_view(),
        name="frame_preview",
    ),
]
