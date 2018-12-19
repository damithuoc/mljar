import {
  DATAFRAME_PREVIEW_LOADING,
  GET_DATAFRAME_PREVIEW_SUCCESS,
  GET_DATAFRAME_PREVIEW_ERROR
} from "./dataFramePreviewTypes";

const initialState = {
  preview_data: [],
  columns_description: [],
  nrows: null,
  ncols: null,
  loading: false,
  error_message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DATAFRAME_PREVIEW_LOADING:
      return {
        ...state,
        preview_data: [],
        columns_description: [],
        nrows: null,
        ncols: null,
        loading: true,
        error_message: ""
      };
    case GET_DATAFRAME_PREVIEW_SUCCESS:
      return {
        ...state,
        preview_data: JSON.parse(action.payload["preview_data"]),
        columns_description: action.payload["columns_description"],
        nrows: action.payload["nrows"],
        ncols: action.payload["ncols"],
        loading: false,
        error_message: ""
      };
    case GET_DATAFRAME_PREVIEW_ERROR:
      return {
        ...state,
        preview_data: [],
        columns_description: [],
        nrows: null,
        ncols: null,
        loading: true,
        error_message: action.error_message
      };
    default:
      return state;
  }
}
