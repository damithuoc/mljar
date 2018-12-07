# celery -A consumer worker --loglevel=info -E
# celery -A worker.consumer worker --loglevel=info -E

import os
import sys

import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# create a file handler
# handler = logging.FileHandler("mljar-backend-worker.log")
# handler.setLevel(logging.DEBUG)
# formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
# handler.setFormatter(formatter)
# logger.addHandler(handler)


import time
from celery import Celery
from celery import Task


WORKERS = Celery("worker")
WORKERS.config_from_object("worker.celeryconfig")

BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERVER_DIR = os.path.join(BACKEND_DIR, "server")
sys.path.insert(0, SERVER_DIR)
sys.path.insert(0, os.path.join(SERVER_DIR, "apps"))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
import django

django.setup()

from worker.etl.process_uploaded_file import ProcessUploadedFile
from worker.automl.start_mlexperiment import StartMLExperiment
from worker.automl.train_mlmodel import TrainMLModel

### Read uploaded file and convert to data frame
class ReadUploadedFileTask(Task):
    def run(self, *args, **kwargs):
        logger.info("ReadUploadedFileTask, args:{0}".format(args))
        params = args[0]
        ProcessUploadedFile(params).run()


ReadUploadedFileTask = WORKERS.register_task(ReadUploadedFileTask())

### Start ML Experiment
class StartMLExperimentTask(Task):
    def run(self, *args, **kwargs):
        logger.info("StartMLExperimentTask, args:{0}".format(args))
        params = args[0]
        start_mlexperiment.StartMLExperiment(params).run()


StartMLExperimentTask = WORKERS.register_task(StartMLExperimentTask())

### Train ML Model
class TrainMLModelTask(Task):
    def run(self, *args, **kwargs):
        logger.info("TrainMLModelTask, args:{0}".format(args))
        params = args[0]
        TrainMLModel(params).run()


TrainMLModelTask = WORKERS.register_task(TrainMLModelTask())
