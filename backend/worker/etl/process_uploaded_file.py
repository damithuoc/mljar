import os
import logging
import numpy as np
import pandas as pd

from worker.etl.serve import DataServe
from storage.storage import Storage

logger = logging.getLogger(__name__)

from apps.datasources.models import DataFrame

class ProcessUploadedFile:

    def __init__(self, params):
        # set params
        self.params = params


    def run(self):
        # read data
        logger.debug("Read data from {0}".format(self.params.get("storage_full_path")))
        df = DataServe.get(self.params.get("storage_full_path"))
        print(df.head())
