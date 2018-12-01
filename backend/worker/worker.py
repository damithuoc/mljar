
# celery -A worker worker --loglevel=info -E
import os
import sys
BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BACKEND_DIR)
SERVER_DIR = os.path.join(BACKEND_DIR, 'server')
sys.path.insert(0, SERVER_DIR)

print(sys.path)
import time
from celery import Celery
import celeryconfig


WORKERS = Celery('worker')
WORKERS.config_from_object('celeryconfig')


@WORKERS.task(name='worker.worker.task_add', bind=True)
def task_add(self, params):
    print("Task add", params)
    ''' Celery task job '''



    return True
