import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Route, Switch } from 'react-router'
import axios from 'axios';

import Root from './Root';
import NavbarMain from './components/layout/NavbarMain.js';
import FooterMain from './components/layout/FooterMain.js';
import NotFoundView from './components/common/NotFound.js'
//import Home from './components/Home';
import SignIn from './components/auth/SignIn';
import LogoutView from './components/auth/Logout.js';
import Projects from './components/projects/Projects';
import ProjectView from './components/projects/ProjectView.js';

import AddProjectView from './components/projects/AddProjectView.js';
//import AddProject from './components/tasks/AddProject';

import requireAuthentication from './utils/requireAuthentication';
//import store from './store';

import './App.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class App extends Component {
  render() {

    return (
    	<Root>
    			<div className="App">
          <NavbarMain />
          <Switch>
            <Route path="/login" component={SignIn} />
            <Route path="/logout" component={LogoutView} />

            <Route exact path="/" component={requireAuthentication(Projects)} />
            <Route exact path="/projects/" component={requireAuthentication(Projects)} />
            <Route exact path="/project/:id/" component={ProjectView} />

            <Route path="/projects/add/" component={ AddProjectView } />
            <Route path="*" component={NotFoundView}/>
          </Switch>
          <FooterMain />
    			</div>
	    </Root>
    );
  }
}

export default App;
