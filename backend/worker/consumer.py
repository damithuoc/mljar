# celery -A consumer worker --loglevel=info -E
import os
import sys

import time
from celery import Celery
from celery import Task

from worker.datasources.process_uploaded_file import ProcessUploadedFile

WORKERS = Celery("worker")
WORKERS.config_from_object("worker.celeryconfig")


class ReadUploadedFileTask(Task):
    def run(self, *args, **kwargs):
        print("ReadUploadedFileTask")
        params = args[0]
        print(params)
        ProcessUploadedFile(params).run()


ReadUploadedFileTask = WORKERS.register_task(ReadUploadedFileTask())
