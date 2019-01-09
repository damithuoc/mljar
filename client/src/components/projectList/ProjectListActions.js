import axios from "axios";
import {
  PROJECTS_LOADING,
  GET_PROJECTS,
  GET_ERRORS,
  ADD_PROJECT,
  DELETE_PROJECT
} from "./ProjectListTypes";
import { push } from "connected-react-router";
import { toast } from "react-toastify";

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// Get all projects
export const getProjects = organization_slug => dispatch => {
  dispatch(setProjectsLoading());

  axios
    .get(`/api/v1/${organization_slug}/projects`)
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
  dispatch(setProjectsLoading());

  axios
    .post(`/api/v1/personal/projects`, projectData)
    .then(res => {
      dispatch({ type: ADD_PROJECT, newProject: res.data });
    })
    .catch(err => {
      toast.error("Add project problems. " + err, {
        autoClose: 8000,
        hideProgressBar: true,
        newsetOnTop: true
      });
    });
};

// Delete project
export const deleteProject = (organizationSlug, projectId) => dispatch => {
  dispatch(setProjectsLoading());

  axios
    .delete(`/api/v1/${organizationSlug}/projects/${projectId}`)
    .then(res => {
      dispatch({
        type: DELETE_PROJECT,
        projectId: projectId
      });
    })
    .catch(err => {
      toast.error("Delete project problems. " + err, {
        autoClose: 8000,
        hideProgressBar: true,
        newsetOnTop: true
      });
    });
};

// Open project
export const openProject = (organization_slug, project_id) => dispatch => {
  dispatch(push("/" + organization_slug + "/project/" + project_id));
};
