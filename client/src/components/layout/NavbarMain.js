import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { signOutUser } from "../../actions/authActions";

import isEmpty from "../../validation/isEmpty";

import {
  Collapse,
  Navbar,
  //NavbarToggler,
  Nav,
  NavItem
  //NavLink,
  //UncontrolledDropdown,
  //DropdownToggle,
  //DropdownMenu,
  //DropdownItem
} from "reactstrap";

class NavbarMain extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.signOutUser();
  }

  render() {
    const { isAuthenticated, user, organization } = this.props.auth;

    const guestLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link to="/login/" className="nav-link">
            Sign In
          </Link>
        </NavItem>
      </Nav>
    );

    const authLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link
            to="/logout/"
            className="nav-link"
            onClick={this.onLogoutClick.bind(this)}
          >
            Logout [{user.username}]
          </Link>
        </NavItem>
      </Nav>
    );

    const project_link = isEmpty(this.props.projectDetail.projectDetail)
      ? false
      : "/" +
        organization.slug +
        "/project/" +
        this.props.projectDetail.projectDetail.id;

    return (
      <Navbar color="light" light expand="md" className="mb-3">
        <Link to="/" className="navbar-brand">
          MLJAR
        </Link>

        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isAuthenticated ? (
              <NavItem>
                <Link
                  to={"/" + organization.slug + "/projects/"}
                  className="nav-link"
                >
                  Projects {organization.slug}
                </Link>
              </NavItem>
            ) : (
              " "
            )}

            {project_link && (
              <NavItem>
                <Link to={project_link} className="nav-link">
                  <strong>
                    Current: {this.props.projectDetail.projectDetail.title}
                  </strong>
                </Link>
              </NavItem>
            )}
          </Nav>
          {isAuthenticated ? authLinks : guestLinks}
        </Collapse>
      </Navbar>
    );
  }
}

NavbarMain.propTypes = {
  auth: PropTypes.object.isRequired,
  projectDetail: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  projectDetail: state.projectDetail
});

export default connect(
  mapStateToProps,
  { signOutUser }
)(NavbarMain);
