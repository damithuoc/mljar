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
        self.job_params = params
        logger.info("ProcessUploadedFile input parameters: {0}".format(self.job_params))

    def run(self):
        # read data
        logger.debug(
            "Read data (id={0}) from {1}".format(
                self.job_params.get("db_id"), self.job_params.get("absolute_path")
            )
        )
        df = DataServe.get(self.job_params.get("absolute_path"))

        # Compute preview JSON
        json_preview = self.getPreviewJSONString(df)
        if json_preview is not None:
            preview_absolute_path = (
                self.job_params.get("absolute_path") + "_preview.json"
            )
            DataServe.put_string(json_preview, preview_absolute_path)
        else:
            preview_absolute_path = None
        logger.debug("JSON preview, {0}".format(preview_absolute_path))
        # Compute columns details
        columns_details = self.get_columns_details(df)
        logger.debug("Columns details {0}".format(columns_details))
        # create mljar data frame
        mljar_df = DataFrame(
            source_id=self.job_params.get("db_id"),
            absolute_path=self.job_params.get(
                "absolute_path"
            ),  # the same data as source file
            file_size=1,  # TODO fix the file size
            columns_details=columns_details,
            preview_absolute_path=preview_absolute_path,
            created_by_id=self.job_params["created_by_id"],
            parent_organization_id=self.job_params["parent_organization_id"],
            parent_project_id=self.job_params["parent_project_id"],
        )
        mljar_df.save()

    # Method return STRING
    def getPreviewJSONString(self, df):
        logger.debug("Create DataFrame JSON preview, df shape {0}".format(df.shape))
        nrows, ncols = df.shape
        # prepare preview only for data frames with less than 100 columns
        # TODO need to add column pagination on data frames
        # or show first 50 and last 50 columns
        if df.shape[1] > ncols:
            return None
        # max 100 rows from the top of data frame
        max_rows = np.min([100, nrows])
        return df.head(max_rows).to_json(orient="records")

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
