from django.conf.urls import url, include

from projects.views import ProjectViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)
router.register(r'(?P<organization_slug>.+)/projects', ProjectViewSet, base_name='projects')

urlpatterns = [
    url(r'^api/', include(router.urls)),
]
