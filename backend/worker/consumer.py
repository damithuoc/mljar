# celery -A consumer worker --loglevel=info -E
import os
import sys

import time
from celery import Celery
from celery import Task


WORKERS = Celery("worker")
WORKERS.config_from_object("worker.celeryconfig")

BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERVER_DIR = os.path.join(BACKEND_DIR, "server")
sys.path.insert(0, SERVER_DIR)

sys.path.insert(0, os.path.join(SERVER_DIR, "apps"))
print(sys.path)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
import django

django.setup()

from worker.etl.process_uploaded_file import ProcessUploadedFile

class ReadUploadedFileTask(Task):
    def run(self, *args, **kwargs):
        print("ReadUploadedFileTask")
        params = args[0]
        print(params)
        ProcessUploadedFile(params).run()


ReadUploadedFileTask = WORKERS.register_task(ReadUploadedFileTask())
