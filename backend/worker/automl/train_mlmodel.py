import os
import json
import time
import logging
import numpy as np
import pandas as pd

from worker.etl.serve import DataServe
from storage.storage import Storage

logger = logging.getLogger(__name__)

from apps.datasources.models import DataFrame
from apps.ml.models import MLExperiment
from apps.ml.models import MLModel


from supervised.iterative_learner_framework import IterativeLearner

class TrainMLModel:
    def __init__(self, params):
        self.job_params = params
        logger.info("TrainMLModel input parameters: {0}".format(params))

    def run(self):
        # update status
        mlmodel = MLModel.objects.get(pk=self.job_params.get("db_id"))
        mlmodel.status = "started"
        mlmodel.save()
        mlexperiment = MLExperiment.objects.get(pk=mlmodel.parent_experiment_id)
        print("mlexperiment", mlexperiment.id)
