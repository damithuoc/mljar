import axios from "axios";
import {
  DATA_SOURCES_LOADING,
  GET_DATA_SOURCES,
  GET_UPLOAD_DESTINATION
} from "./types";
import { push } from "connected-react-router";

//"{0}/api/v1/{1}/{2}/{3}/upload_destination".format(
//    self.get_server_url(), self.org1, self.project["id"], "test-1.txt"
//),

export const getFileDataSourceUploadDestination = (
  organization_slug,
  project_id,
  file_name
) => dispatch => {
  dispatch(setDataSourcesLoading());
  axios
    .get(
      `/api/v1/${organization_slug}/${project_id}/${file_name}/upload_destination`
    )
    .then(res =>
      dispatch({
        type: GET_UPLOAD_DESTINATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_UPLOAD_DESTINATION,
        payload: {}
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
