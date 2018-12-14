import axios from "axios";
import { GET_UPLOAD_DESTINATION } from "./types";
import { push } from "connected-react-router";

export const getUploadDestination = (
  organization_slug,
  project_id,
  file_name
) => dispatch => {
  console.log("getUpload axios");
  axios
    .get(
      `/api/v1/${organization_slug}/${project_id}/${file_name}/upload_destination`
    )
    .then(res =>
      dispatch({
        type: GET_UPLOAD_DESTINATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_UPLOAD_DESTINATION,
        payload: {}
      })
    );
};
