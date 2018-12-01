from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include

from .views import MljarUserCreateView

from django.contrib.auth import get_user_model
from djoser import views
from rest_framework.routers import DefaultRouter
from accounts.views import MljarUserOrganizationList

User = get_user_model()

urlpatterns = [
    url(r"^api/v1/users/create/?$", MljarUserCreateView.as_view(), name="user_create"),
    url(r"^api/v1/users/delete/?$", views.UserDeleteView.as_view(), name="user_delete"),
    url(
        r"^api/v1/users/password/?$",
        views.SetPasswordView.as_view(),
        name="set_password",
    ),
    url(
        r"^api/v1/users/password/reset/?$",
        views.PasswordResetView.as_view(),
        name="password_reset",
    ),
    url(
        r"^api/v1/users/password/reset/confirm/?$",
        views.PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    url(r"^api/v1/users/auth/", include("djoser.urls.authtoken")),
    url(
        r"^api/v1/users/organization/?$",
        MljarUserOrganizationList.as_view(),
        name="user_organization",
    ),
]
