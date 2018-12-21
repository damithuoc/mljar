import {
  EXPERIMENTS_LOADING,
  GET_EXPERIMENTS_SUCCESS,
  GET_EXPERIMENTS_ERROR
} from "./experimentListTypes";

const initialState = {
  experiments: [],
  loading: false,
  error_message: ""
};

export function experimentListReducer(state = initialState, action) {
  switch (action.type) {
    case EXPERIMENTS_LOADING:
      return {
        ...state,
        experiments: [],
        loading: true,
        error_message: ""
      };
    case GET_EXPERIMENTS_SUCCESS:
      return {
        ...state,
        experiments: action.payload,
        loading: false,
        error_message: ""
      };
    case GET_EXPERIMENTS_ERROR:
      return {
        ...state,
        experiments: [],
        loading: false,
        error_message: action.error_message
      };
    default:
      return state;
  }
}
