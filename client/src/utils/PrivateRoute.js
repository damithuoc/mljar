import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function a(b) {
  console.log('b------------------------>', b);
  return b;
}

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
   {...rest}
   render={props =>
   a(auth.isAuthenticated) //
    ? <Component {...props} />
    : <Redirect to={{ pathname: "/sign-in" }} />}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  console.log("private", state.auth.isAuthenticated);
  return {
     auth: state.auth
  }
};

export default connect(mapStateToProps, null, null, {pure: false})(PrivateRoute);
