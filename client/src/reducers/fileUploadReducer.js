import { GET_UPLOAD_DESTINATION } from "../actions/types";

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
        status: "Upload destination ready"
      };
    default:
      return state;
  }
}
