import axios from "axios";
import { GET_PROJECT } from "./types";
//import { push } from 'connected-react-router';

export const getProjectDetail = (organization_slug, project_id) => dispatch => {
  console.log("deg detail");
  axios
    .get(`/api/v1/personal/projects/${project_id}`) // ${organization_slug}
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROJECT,
        payload: {}
      })
    );
};
