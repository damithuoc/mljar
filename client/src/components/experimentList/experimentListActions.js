import axios from "axios";
import {
  EXPERIMENTS_LOADING,
  GET_EXPERIMENTS_SUCCESS,
  GET_EXPERIMENTS_ERROR
} from "./experimentListTypes";

export const getExperiments = (organization_slug, project_id) => dispatch => {
  dispatch(setExperimentsLoading());
  axios
    .get(`/api/v1/${organization_slug}/${project_id}/mlexperiments`)
    .then(response =>
      dispatch({
        type: GET_EXPERIMENTS_SUCCESS,
        payload: response.data
      })
    )
    .catch(error => {
      let error_message = "Error while fetching ML Experiments. ";

      if (error.response) {
        error_message += error.response.data;
      }
      dispatch({
        type: GET_EXPERIMENTS_ERROR,
        error_message: error_message
      });
    });
};

export const setExperimentsLoading = () => {
  return {
    type: EXPERIMENTS_LOADING
  };
};
