import axios from "axios";
import {
  DATAFRAME_PREVIEW_LOADING,
  GET_DATAFRAME_PREVIEW_SUCCESS,
  GET_DATAFRAME_PREVIEW_ERROR
} from "./dataFramePreviewTypes";

export const getDataFramePreview = (
  organization_slug,
  project_id,
  dataframe_id
) => dispatch => {
  dispatch(setDataFramePreviewLoading());
  axios
    .get(
      `/api/v1/${organization_slug}/${project_id}/dataframe_preview/${dataframe_id}`
    )
    .then(response =>
      dispatch({
        type: GET_DATAFRAME_PREVIEW_SUCCESS,
        payload: response.data
      })
    )
    .catch(error => {
      let error_message = "Error while fetching DataFrame preview. ";

      if (error.response) {
        error_message += error.response.data;
      }
      dispatch({
        type: GET_DATAFRAME_PREVIEW_ERROR,
        error_message: error_message
      });
    });
};

export const setDataFramePreviewLoading = () => {
  return {
    type: DATAFRAME_PREVIEW_LOADING
  };
};
