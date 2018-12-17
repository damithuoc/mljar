import axios from "axios";
import {
  GET_UPLOAD_DESTINATION,
  UPLOAD_SUCCESS,
  UPLOAD_ERROR,
  ADD_FILE_DATASOURCE_ERROR
} from "./types";
import { push } from "connected-react-router";

export const getUploadDestination = (
  organization_slug,
  project_id,
  form_input_file,
  newFileDataSource
) => dispatch => {
  console.log("getUpload axios");
  axios
    .get(
      `/api/v1/${organization_slug}/${project_id}/${
        form_input_file.name
      }/upload_destination`
    )
    .then(res => {
      console.log("get destination");
      dispatch({
        type: GET_UPLOAD_DESTINATION,
        payload: res.data,
        status: "Upload destionation is resolved"
      });
      const { relative_dir } = res.data;
      const { absolute_path } = res.data;
      const { filename } = res.data;
      console.log("relative dir", relative_dir, filename);
      console.log(organization_slug);
      const data = new FormData();
      data.append("file", form_input_file.name, form_input_file);

      newFileDataSource["absolute_path"] = absolute_path;
      newFileDataSource["file_size"] = Math.round(
        form_input_file.size / 1024 / 1024,
        2
      ); // in MB

      dispatch(
        upload(
          organization_slug,
          project_id,
          relative_dir,
          filename,
          data,
          newFileDataSource
        )
      );
    })
    .catch(err =>
      dispatch({
        type: GET_UPLOAD_DESTINATION,
        payload: {},
        status: "Problem with resolving upload destionation"
      })
    );
};

export const upload = (
  organization_slug,
  project_id,
  relative_dir,
  file_name,
  data,
  newFileDataSource
) => dispatch => {
  console.log("upload axios");
  axios
    .put(
      `/api/v1/${organization_slug}/${relative_dir}/${file_name}/upload`,
      data
    )
    .then(res => {
      dispatch({
        type: UPLOAD_SUCCESS,
        status: "Upload success"
      });
      dispatch(
        addFileDataSource(organization_slug, project_id, newFileDataSource)
      );
    })
    .catch(err =>
      dispatch({
        type: UPLOAD_ERROR,
        status: "Upload problems"
      })
    );
};

export const addFileDataSource = (
  organization_slug,
  project_id,
  newFileDataSource
) => dispatch => {
  console.log("add file data source", newFileDataSource);
  axios
    .post(
      `/api/v1/${organization_slug}/${project_id}/file_sources`,
      newFileDataSource
    )
    .then(res =>
      dispatch({
        type: UPLOAD_SUCCESS,
        status: "File data source added"
      })
    )
    .catch(error => {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        let error_status = "";
        //error.response.data.map((field, err_msg) => {
        //
        //});
        for (let [field, msg] of Object.entries(error.response.data)) {
          console.log(field, msg);
          error_status += " ERROR: " + field + ": " + msg;
        }
        dispatch({
          type: ADD_FILE_DATASOURCE_ERROR,
          status: "Add file data source problems" + error_status
        });
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

/*
payload = {
    "title": "new file",
    "description": "a new file for training",
    "absolute_path": absolute_path,
    "file_size": file_size,
    "file_name": filename,
}
file_source = self.request(
    "post",
    "/api/v1/{0}/{1}/file_sources".format(self.org1, self.project["id"]),
    payload,
    self.token,
    201,
)
self.assertEqual(file_source["title"], payload["title"])*/
