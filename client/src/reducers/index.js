import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import projectsReducer from "./projectsReducer";
import projectDetailReducer from "./projectDetailReducer";
import fileUploadReducer from "./fileUploadReducer";
import datasourcesReducer from "./datasourcesReducer";

import dataFrameListReducer from "../components/dataFrameList/dataFrameListReducer";
import dataFramePreviewReducer from "../components/dataFramePreview/dataFramePreviewReducer";
export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    errors: errorsReducer,
    projects: projectsReducer,
    projectDetail: projectDetailReducer,
    fileUpload: fileUploadReducer,
    datasources: datasourcesReducer,
    dataFrameList: dataFrameListReducer,
    dataFramePreview: dataFramePreviewReducer
  });
