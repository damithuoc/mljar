import {
  GET_UPLOAD_DESTINATION,
  UPLOAD_SUCCESS,
  UPLOAD_ERROR,
  ADD_FILE_DATASOURCE_ERROR
} from "../actions/types";

const initialState = {
  destination: {},
  status: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_UPLOAD_DESTINATION:
      return {
        ...state,
        destination: action.payload,
        status: action.status
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        status: action.status
      };

    case UPLOAD_ERROR:
      return {
        ...state,
        status: action.status
      };

    case ADD_FILE_DATASOURCE_ERROR:
      return {
        ...state,
        status: action.status
      };

    default:
      return state;
  }
}
