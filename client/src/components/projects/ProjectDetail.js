import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getProjectDetail } from "../../actions/projectDetailActions";
import { showModal, hideModal } from "../modals/ModalActions";

import moment from "moment";

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openAlertModal = this.openAlertModal.bind(this);
  }

  closeModal(event) {
    console.log("hideModal in ProjectDetails");
    this.props.hideModal();
  }

  openAlertModal() {
    console.log("openAlertModal");

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
    this.props.getProjectDetail(
      this.props.auth.organization.slug,
      this.props.id.id
    );
  }
  componentDidUpdate(prevProps) {}

  onAddDataSource() {
    console.log("add data source");
  }

  render() {
    const { organization } = this.props.auth;
    const { projectDetail } = this.props.projectDetail;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>
              <i className="fa fa-folder-open-o" aria-hidden="true" /> Project{" "}
              {projectDetail.title}
            </h2>
            <p>{projectDetail.description}</p>
            <Link
              to={
                "/" +
                organization.slug +
                "/project/" +
                projectDetail.id +
                "/flow/"
              }
              className="btn btn-primary mt-2"
            >
              Open FLOW
            </Link>
          </div>
          <div className="col text-center text-md-right">
            {" "}
            <small>
              Created at:{" "}
              {moment(projectDetail.created_at).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}{" "}
              by <strong>{projectDetail.created_by_username}</strong>
              <br />
              Last update:{moment(projectDetail.updated_at).fromNow()}{" "}
            </small>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-3">
            <h5>Data sources</h5>
            <h2>{projectDetail.datasources_cnt}</h2>
            <Link
              to={
                "/" +
                organization.slug +
                "/project/" +
                projectDetail.id +
                "/datasources/"
              }
            >
              List
            </Link>{" "}
            {/*| <Link to="/datasources/add/">Add new</Link>*/}
            <br />
            <br />
          </div>

          <div className="col-3">
            <h5>ML experiments</h5>
            <h2>{projectDetail.experiments_cnt}</h2>
            <Link
              to={
                "/" +
                organization.slug +
                "/project/" +
                projectDetail.id +
                "/experiments/"
              }
            >
              List
            </Link>
          </div>

          <div className="col-3">
            <h5>Predictions</h5>
            Coming soon!
          </div>
          <div className="col-3">
            <h5>Charts</h5>
            Coming soon!
          </div>
          <div className="col-3">
            <h5>Dashboards</h5>
            Coming soon!
          </div>
          <div className="col-3">
            <h5>Jobs</h5>
            Coming soon!
          </div>
        </div>
        <br />
        <hr />
        <div className="row">
          <div className="col-6">
            <h5>Latest alarms</h5>
            Coming soon!
          </div>
          <div className="col-6">
            <h5>Latest activity</h5>
            Coming soon!
          </div>
        </div>
      </div>
    );
  }
}

ProjectView.propTypes = {
  id: PropTypes.object.isRequired, // id of the project
  getProjectDetail: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  projectDetail: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params,
  projects: state.projects,
  auth: state.auth,
  projectDetail: state.projectDetail
});

export default connect(
  mapStateToProps,
  { getProjectDetail, showModal, hideModal }
)(withRouter(ProjectView));
