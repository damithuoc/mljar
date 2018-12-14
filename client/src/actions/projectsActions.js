import axios from "axios";
import { PROJECTS_LOADING, GET_PROJECTS, GET_ERRORS } from "./types";
import { push } from "connected-react-router";

//let apiUrl;
//(process.env.REACT_APP_API_URL!==undefined) ? apiUrl=process.env.REACT_APP_API_URL : apiUrl=""

// Get all projects
export const getProjects = organization_slug => dispatch => {
  dispatch(setProjectsLoading());
  axios
    .get("/api/v1/personal/projects") // ${organization_slug}
    .then(res =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROJECTS,
        payload: null
      })
    );
};

// Projects loading
export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING
  };
};

// Add project
export const addProject = projectData => dispatch => {
  axios
    .post(`/api/v1/personal/projects`, projectData)
    .then(res => dispatch(push("/projects")))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add project
export const openProject = project_id => dispatch => {
  console.log("openProject action", project_id);
  dispatch(push("/project/" + project_id));
};
