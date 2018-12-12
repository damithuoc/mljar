import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Route, Switch } from 'react-router'
//import PrivateRoute from './utils/PrivateRoute.js'
import axios from 'axios';

import Root from './Root';
import NavbarMain from './components/layout/NavbarMain.js';
import FooterMain from './components/layout/FooterMain.js';
import NotFoundView from './components/common/NotFound.js'
//import Home from './components/Home';
import SignIn from './components/auth/SignIn';
import Projects from './components/projects/Projects';
//import AddProject from './components/tasks/AddProject';

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
            <Route exact path="/" component={SignIn} />
            <Route exact path="/projects" component={Projects} />
            <Route path="*" component={NotFoundView}/>
          </Switch>
          <FooterMain />
    			</div>
	    </Root>
    );
  }
}

export default App;
