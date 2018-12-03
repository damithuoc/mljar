import os
import logging
import numpy as np
import pandas as pd

logger = logging.getLogger(__name__)


class DataPreview:
    @staticmethod
    def get(df):
        nrows, ncols = data.shape
        if ncols > 1000:
            logger.error("Too much columns {0}, can not process it.".format(ncols))
            return None

        columns_description = []
        for elt in df.columns:
            col_type = str(df[elt].dtype)
            data_type = "categorical"
            if col_type.startswith("float"):
                data_type = "continous"
            if col_type.startswith("int"):
                data_type = "discrete"

            len_unique = len(df.loc[~pd.isnull(df[elt]), elt].unique())

            desc = {
                "name": elt,
                "type": data_type,
                "unique_values": len_unique,
                "NA": 100.0 * np.sum(pd.isnull(vector)) / vector.shape[0],
            }
            columns_description += [desc]

        return {
            "columns_description": columns_description,
            "nrows": nrows,
            "ncols": ncols,
        }
