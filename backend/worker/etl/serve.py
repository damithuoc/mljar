import os
import numpy as np
import pandas as pd

import logging

logger = logging.getLogger(__name__)


class DataServe:
    @staticmethod
    def get(full_file_path):
        try:
            logger.debug("Serve data from {0}".format(full_file_path))
            data = DataServe._read_csv(full_file_path)
            return data  # return pandas data frame
        except Exception as e:
            logger.error("Data serve error, {0}".format(str(e)))
            raise e

    @staticmethod
    def _read_csv(fname):
        df = pd.read_csv(fname, skipinitialspace=True)
        return df
