import os
import json
import logging
import numpy as np
import pandas as pd

from worker.etl.serve import DataServe
from storage.storage import Storage

logger = logging.getLogger(__name__)

from apps.datasources.models import DataFrame
from apps.ml.models import MLExperiment
from apps.ml.models import MLModel


class TrainMLModel:
    def __init__(self, params):
        self.job_params = params
        logger.info("TrainMLModel input parameters: {0}".format(params))

    def run(self):
        # update status
        mlmodel = MLModel.objects.get(pk=self.job_params.get("db_id"))
        mlmodel.status = "started"
        mlmodel.save()
