import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import classnames from 'classnames';

import { getProjects, openProject } from "../../actions/projectsActions";
//import { getCompletedTask } from '../../actions/tasksActions';
//import { deleteTask } from '../../actions/tasksActions';
import moment from "moment";

class Projects extends Component {
  componentDidMount() {
    this.props.getProjects();
  }
  componentDidUpdate(prevProps) {}
  onOpenProject(id) {
    const { organization } = this.props.auth;
    this.props.openProject(organization.slug, id);
  }

  render() {
    const { projects, loading } = this.props.projects;
    let projectsItems;

    if (projects === null || loading) {
      projectsItems = <div>Loading projects ...</div>;
    } else {
      if (projects.length > 0) {
        projectsItems = projects.map(project => {
          return (
            <div className="border-bottom" key={project.id}>
              <div className="row mb-3 mt-3">
                <div className="col-9">
                  <h4>
                    Project: {project.title} <br />
                  </h4>
                  <b>Description:</b> {project.description} <br />
                  <b>Created at:</b>{" "}
                  {moment(project.created_at).format("MMMM Do YYYY, h:mm:ss a")}{" "}
                  <br />
                  <b>Last update:</b> {moment(project.updated_at).fromNow()}{" "}
                  <br />
                  <b>Created by:</b> {project.created_by_username} <br />
                  <small>(Id: {project.id})</small>
                  <br />
                </div>

                <div className="col-3">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={this.onOpenProject.bind(this, project.id)}
                  >
                    <b>Open project</b>
                  </button>{" "}
                  <button className="btn btn-primary btn-sm">Edit</button>{" "}
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            </div>
          );
        });
      } else {
        projectsItems = <div>Projects list is empty</div>;
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h1>Projects {this.props.auth.organization.name}</h1>
          </div>

          <div className="col-2">
            <Link
              to="/projects/add/"
              className="btn btn-primary btn-lg mt-2 btn-block"
            >
              Add project
            </Link>
          </div>
        </div>
        <hr />
        {projectsItems}
      </div>
    );
  }
}

Projects.propTypes = {
  getProjects: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,

  //getCompletedTask: PropTypes.func.isRequired,
  //deleteTask: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  projects: state.projects,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProjects, openProject }
)(withRouter(Projects));
