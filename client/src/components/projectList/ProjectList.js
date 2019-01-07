import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getProjects, openProject } from "./ProjectListActions";

import moment from "moment";

import { showModal, hideModal } from "../modals/ModalActions";
import { Button } from "reactstrap";

class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
    this.openCreateProjectModal = this.openCreateProjectModal.bind(this);
  }

  closeModal(event) {
    this.props.hideModal();
  }

  openCreateProjectModal() {
    this.props.showModal(
      {
        open: true,
        title: "Alert Modal",
        message: "Good luck!",
        closeModal: this.closeModal
      },
      "createProject"
    );
  }

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
            <div className="col-6 mt-2">
              <div className="projectdiv">
                <h4>
                  Project: {project.title} <br />
                </h4>
                <b>Description:</b> {project.description} <br />
                <b>Created by:</b> {project.created_by_username} <br />
                <b>Last update:</b> {moment(project.updated_at).fromNow()}{" "}
                <br />
                <b>Created at:</b>{" "}
                {moment(project.created_at).format("MMMM Do YYYY, h:mm:ss a")}{" "}
                <br />
                <small>(Id: {project.id})</small>
                <Button
                  color="primary"
                  className="float-right"
                  onClick={this.onOpenProject.bind(this, project.id)}
                >
                  <b>Open project</b>
                </Button>{" "}
                <br />
              </div>
            </div>
          );
        });
      } else {
        projectsItems = <div>Projects list is empty</div>;
      }
    }

    const projCnt = projects.length;

    return (
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h2>
              Projects {this.props.auth.organization.name} ({projCnt})
            </h2>
          </div>

          <div className="col-2">
            <button
              className="btn btn-success btn-lg "
              onClick={this.openCreateProjectModal}
            >
              <i className="fa fa-plus" aria-hidden="true" /> Add new project
            </button>
          </div>
        </div>
        <hr />

        <div className="container">
          <div className="row  mb-3 mt-3">{projectsItems}</div>
        </div>
      </div>
    );
  }
}

ProjectList.propTypes = {
  getProjects: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,

  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,

  projects: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  projects: state.projects,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProjects, openProject, showModal, hideModal }
)(withRouter(ProjectList));
