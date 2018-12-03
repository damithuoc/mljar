import os
import logging
import numpy as np
import pandas as pd

from worker.datasources.serve import DataServe
from storage.storage import Storage

logger = logging.getLogger(__name__)


class ProcessUploadedFile:
    def __init__(self, params):
        # set params
        self.params = params
        self.full_file_path = os.path.join(
            params.get("file_path"), params.get("file_name")
        )
        print(self.full_file_path)

    def run(self):
        # read data
        logger.debug("Read data from {0}".format(self.full_file_path))
        df = DataServe.get(self.full_file_path)
        print(df.head())
