import axios from "axios";
//import { CREATE_EXPERIMENT } from "./CreateExperimentTypes";

export const createExperiment = (
  organization_slug,
  project_id,
  newExperiment
) => dispatch => {
  axios
    .post(
      `/api/v1/${organization_slug}/${project_id}/mlexperiments`,
      newExperiment
    )
    .then(response => {
      console.log("Success" + response.data + response.status);
    })
    .catch(error => {
      let error_message = "Error while creating ML Experiment. ";

      if (error.response) {
        error_message += error.response.data;
      }
      console.log("err" + error_message);
    });
};
