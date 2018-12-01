import getpass
import json
import six
from django.core.management.base import BaseCommand
from django.utils import timezone
from accounts.models import MljarUser
from accounts.serializers import MljarUserCreateSerializer
from rest_framework.serializers import ValidationError


class Command(BaseCommand):
    help = "Create user account"

    def create_account(self):
        try:
            print("-" * 70)
            print("What is your username?")
            username = input()
            print("What is your email?")
            email = input()
            print("Please set password")
            pswd = getpass.getpass("Password:")

            payload = {
                "email": email,
                "username": username,
                "password": pswd,
                "organization": "personal",
            }
            user_serializer = MljarUserCreateSerializer(data=payload)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
            print("[DONE] User created successfuly")
            return True
        except ValidationError as e:
            print("-" * 70)
            print("There were errors while creating account for you:")
            for k, v in e.detail.items():
                print("[ERROR] {0}".format(v[0]))
            print("Please correct the errors and try again")

        return False

    def handle(self, *args, **kwargs):
        if not MljarUser.objects.all().exists():
            print("Please set up your account in your own MLJAR installation.")
            success = self.create_account()
