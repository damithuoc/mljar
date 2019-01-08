import {
  PROJECTS_LOADING,
  GET_PROJECTS,
  DELETE_PROJECT
} from "./ProjectListTypes";

const initialState = {
  projects: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (item, index) => item.id !== action.projectId
        ),
        loading: false
      };
    default:
      return state;
  }
}
