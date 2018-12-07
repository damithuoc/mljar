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

from supervised.callbacks.early_stopping import EarlyStopping
from supervised.callbacks.metric_logger import MetricLogger

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

        # prepare data
        column_usage = mlexperiment.column_usage
        data_usage = mlexperiment.params.get("data_usage")
        metric_params = mlexperiment.params.get("metric")
        validation_params = mlexperiment.params.get("validation")
        preprocessing_params = mlexperiment.params.get("preprocessing")

        df_train = DataServe.get(data_usage.get("train_absolute_path"))

        training_data = {
            "train": {
                "X": df_train[column_usage.get("input")],
                "y": df_train[column_usage.get("target")],
            }
        }

        # prepare model hyper parameters
        learner_params = {
            "learner_type": mlmodel.model_type,
            "max_iters": 3,
            "max_depth": 1,
        }
        for k, v in mlmodel.params.items():
            learner_params[k] = v

        train_params = {
            "preprocessing": preprocessing_params,
            "validation": validation_params,
            "learner": learner_params,
        }
        print(train_params)
        # prepare needed callbacks
        early_stop = EarlyStopping({"metric": {"name": "logloss"}})
        metric_logger = MetricLogger({"metric_names": ["logloss", "auc"]})
        # run the training
        il = IterativeLearner(train_params, callbacks=[early_stop, metric_logger])
        il.train(training_data)
