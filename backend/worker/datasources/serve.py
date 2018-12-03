import os
import logging
import numpy as np
import pandas as pd

logger = logging.getLogger(__name__)


class DataServe:
    @staticmethod
    def get_data(file_path, file_name):
        try:
            full_file_path = os.path.join(file_path, file_name)
            logger.debug("Serve data from {0}" % full_file_path)
            data = DataServe._read_csv(full_file_path)
            return data  # return pandas data frame
        except Exception as e:
            logger.error("Data serve error, {0}".format(str(e)))
            raise e

    @staticmethod
    def _read_csv(self, fname):
        df = pd.read_csv(fname, skipinitialspace=True)
        return df
