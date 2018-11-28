"""
Django settings for server project.

Generated by 'django-admin startproject' using Django 2.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
import sys

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_DIR = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
BACKEND_DIR = os.path.dirname(BASE_DIR)
WORKER_DIR = os.path.join(BACKEND_DIR, "worker")
# Project paths
sys.path.insert(0, BACKEND_DIR)
sys.path.insert(0, WORKER_DIR)
sys.path.insert(0, os.path.join(BASE_DIR, "apps"))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "h4a78jxyq5!kd4!5*qs21u7!=a*w%rl8*&7_a2894o-=uj2wy2"

# SECURITY WARNING: don't run with debug turned on in production!
from config import DJANGO_DEBUG

DEBUG = DJANGO_DEBUG

# SECURITY WARNING !!!!
ALLOWED_HOSTS = [
    "0.0.0.0",
    "127.0.0.1",
    "localhost",
    "asgiserver",
    "wsgiserver",
    "*",
]  # allow all host, not good, use it for testing only!!!!!!


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "django.contrib.humanize",
    # 3rd party
    "rest_framework",
    "rest_framework.authtoken",
    "djoser",
    "django_extensions",
    # my apps
    "projects",
    "datasources",
    "accounts",
]

AUTH_USER_MODEL = "accounts.MljarUser"
ACCOUNT_AUTHENTICATION_METHOD = "email"
REST_FRAMEWORK = {
    "Default_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.TokenAuthentication",
    ),
}

DJOSER = {
    "PASSWORD_RESET_CONFIRM_URL": "/password/reset/confirm/{uid}/{token}",
    "ACTIVATION_URL": "/activate/{uid}/{token}",
    "SEND_ACTIVATION_EMAIL": False,
    "SERIALIZERS": {"user_create": "accounts.serializers.MljarUserCreateSerializer"},
}

PROTOCOL = "https"
DOMAIN = "127.0.0.1:8000"
SITE_NAME = "MLJAR"
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "server.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.template.context_processors.i18n",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

WSGI_APPLICATION = "server.wsgi.application"


# Database

from config import (
    DATABASE_URL,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASS,
    DATABASE_PORT,
)

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": DATABASE_NAME,
        "USER": DATABASE_USER,
        "PASSWORD": DATABASE_PASS,
        "HOST": DATABASE_URL,
        "PORT": DATABASE_PORT,
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]

STATICFILES_DIRS = [os.path.join(BASE_DIR, "staticfiles")]

STATIC_ROOT = os.path.join(BASE_DIR, "django_static")
STATIC_URL = "/django_static/"

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"

# Site ID
SITE_ID = 1

from config import REDIS_URL, REDIS_PORT

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {"hosts": [(REDIS_URL, REDIS_PORT)]},
    }
}


# Upload options
FILE_UPLOAD_MAX_MEMORY_SIZE = 536870912  # 512 MB
