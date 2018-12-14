import axios from "axios";
import { DATA_SOURCES_LOADING, GET_DATA_SOURCES } from "./types";
import { push } from "connected-react-router";

export const getFileDataSourceUploadDestination = organization_slug => dispatch => {
  dispatch(setDataSourcesLoading());
  axios
    .get("/api/v1/personal/datasources") // ${organization_slug}
    .then(res =>
      dispatch({
        type: GET_DATA_SOURCES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DATA_SOURCES,
        payload: null
      })
    );
};

export const getDataSources = organization_slug => dispatch => {
  dispatch(setDataSourcesLoading());
  axios
    .get("/api/v1/personal/datasources") // ${organization_slug}
    .then(res =>
      dispatch({
        type: GET_DATA_SOURCES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DATA_SOURCES,
        payload: null
      })
    );
};

// Data Sources loading
export const setDataSourcesLoading = () => {
  return {
    type: DATA_SOURCES_LOADING
  };
};
