import React, { Component } from "react";
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Route, Switch } from "react-router";
import axios from "axios";

import Root from "./Root";
import NavbarMain from "./components/layout/NavbarMain.js";
import FooterMain from "./components/layout/FooterMain.js";
import NotFoundView from "./components/common/NotFound.js";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import LogoutView from "./components/auth/Logout.js";
import ProjectList from "./components/projectList/ProjectList";
import ProjectDetail from "./components/projects/ProjectDetail.js";

import AddProject from "./components/projects/AddProject.js";
import DataSources from "./components/projects/DataSources.js";
import AddDataSource from "./components/projects/AddDataSource";

import DataFrameList from "./components/dataFrameList/dataFrameList";
import DataFramePreview from "./components/dataFramePreview/dataFramePreview";

import ExperimentList from "./components/experimentList/experimentList";

import ProjectFlow from "./components/projectFlow/ProjectFlow";

import requireAuthentication from "./utils/requireAuthentication";
import ModalRoot from "./components/modals/ModalRoot";
import "./App.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends Component {
  render() {
    return (
      <Root>
        <div className="App">
          <NavbarMain />
          <div>
            <ModalRoot />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/logout" component={LogoutView} />

              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/:organization_slug/projects/"
                component={requireAuthentication(ProjectList)}
              />
              <Route
                exact
                path="/:organization_slug/project/:id/"
                component={requireAuthentication(ProjectDetail)}
              />

              <Route
                path="/:organization_slug/projects/add/"
                component={requireAuthentication(AddProject)}
              />
              <Route
                path="/:organization_slug/datasources/add/"
                component={requireAuthentication(AddDataSource)}
              />

              <Route
                path="/:organization_slug/project/:project_id/flow/"
                component={requireAuthentication(ProjectFlow)}
              />

              <Route
                path="/:organization_slug/project/:project_id/datasources/"
                component={requireAuthentication(DataSources)}
              />

              <Route
                path="/:organization_slug/project/:project_id/dataframes/"
                component={requireAuthentication(DataFrameList)}
              />
              <Route
                path="/:organization_slug/project/:project_id/dataframe_preview/:dataframe_id/"
                component={requireAuthentication(DataFramePreview)}
              />

              <Route
                path="/:organization_slug/project/:project_id/experiments/"
                component={requireAuthentication(ExperimentList)}
              />

              <Route path="*" component={NotFoundView} />
            </Switch>
          </div>

          <FooterMain />
        </div>
      </Root>
    );
  }
}

export default App;
