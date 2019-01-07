import { PROJECTS_LOADING, GET_PROJECTS } from "./ProjectListTypes";

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
    default:
      return state;
  }
}
