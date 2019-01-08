import axios from "axios";
import {
  PROJECTS_LOADING,
  GET_PROJECTS,
  GET_ERRORS,
  DELETE_PROJECT
} from "./ProjectListTypes";
import { push } from "connected-react-router";

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
    .then(res => {
      console.log("then addProject ");
      console.log(res);
      //dispatch(push("/projects"));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add project
export const openProject = (organization_slug, project_id) => dispatch => {
  console.log("openProject action", project_id);
  dispatch(push("/" + organization_slug + "/project/" + project_id));
};

// Delete project
export const deleteProject = (organizationSlug, projectId) => dispatch => {
  axios
    .delete(`/api/v1/${organizationSlug}/projects/${projectId}`) //
    .then(res => {
      console.log(res);

      dispatch({
        type: DELETE_PROJECT,
        projectId: projectId
      });
    })
    .catch(
      err => {
        console.log(err);
      }
      //dispatch({
      //    type: GET_PROJECTS,
      //    payload: null
      //  })
    );
};
