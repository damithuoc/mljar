import os
import json
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
        logger.info("ProcessUploadedFile input parameters: {0}".format(params))

    def run(self):
        # read data
        logger.debug(
            "Read data (id={0}) from {1}".format(
                self.params.get("db_id"), self.params.get("absolute_path")
            )
        )
        df = DataServe.get(self.params.get("absolute_path"))

        # create mljar data frame
        columns_details = self.get_columns_details(df)
        logger.debug("Columns details {0}".format(columns_details))
        mljar_df = DataFrame(
            source_id=self.params.get("db_id"),
            absolute_path=self.params.get(
                "absolute_path"
            ),  # the same data as source file
            file_size=1,  # TODO fix the file size
            columns_details=columns_details,
            created_by_id=self.params["created_by_id"],
            parent_organization_id=self.params["parent_organization_id"],
            parent_project_id=self.params["parent_project_id"],
        )
        mljar_df.save()

    def get_columns_details(self, df):
        nrows, ncols = df.shape
        if ncols > 1000:
            logger.error("Too much columns {0}, can not process it.".format(ncols))
            return None

        columns_description = []
        for column in df.columns:
            col_type = str(df[column].dtype)
            data_type = "categorical"
            if col_type.startswith("float"):
                data_type = "continous"
            if col_type.startswith("int"):
                data_type = "discrete"

            desc = {"name": column, "type": data_type}
            columns_description += [desc]

        return {
            "columns_description": columns_description,
            "nrows": nrows,
            "ncols": ncols,
        }
