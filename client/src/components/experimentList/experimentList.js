import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getExperiments } from "./experimentListActions";
import { getProjectDetail } from "../../actions/projectDetailActions";
import moment from "moment";
import isEmpty from "../../validation/isEmpty";

class ExperimentList extends Component {
  componentDidMount() {
    const { organization_slug } = this.props.organization_slug;
    const { project_id } = this.props.project_id;
    const { projectDetail } = this.props.projectDetail;

    if (isEmpty(projectDetail)) {
      this.props.getProjectDetail(organization_slug, project_id);
    }
    this.props.getExperiments(organization_slug, project_id);
  }
  componentDidUpdate(prevProps) {}

  render() {
    const { organization_slug } = this.props.organization_slug;
    const { project_id } = this.props.project_id;
    const { experiments, loading } = this.props.experimentList;
    let items;

    if (loading) {
      items = <div>Loading Experiments ...</div>;
    } else {
      if (experiments.length > 0) {
        items = experiments.map(experiment => {
          return (
            <div className="border-bottom" key={experiment.id}>
              <div className="row mb-3 mt-3">
                <div className="col-9">
                  <h4>
                    Experiment: {experiment.title} <br />
                  </h4>
                  <b>Created at:</b>{" "}
                  {moment(experiment.created_at).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}{" "}
                  <br />
                  <b>Last update:</b> {moment(experiment.updated_at).fromNow()}{" "}
                  <br />
                  <small>(Id: {experiment.id})</small>
                  <br />
                </div>
              </div>
            </div>
          );
        });
      } else {
        items = <div>Experiments list is empty</div>;
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h1>Machine Learning Experiments</h1>
          </div>
        </div>
        <hr />
        {items}

        <Link to={"/" + organization_slug + "/project/" + project_id}>
          {"<<"} Back
        </Link>
      </div>
    );
  }
}

ExperimentList.propTypes = {
  projectDetail: PropTypes.object.isRequired,
  getProjectDetail: PropTypes.func.isRequired,
  getExperiments: PropTypes.func.isRequired,
  organization_slug: PropTypes.object.isRequired,
  project_id: PropTypes.object.isRequired,
  experimentList: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  projectDetail: state.projectDetail,
  organization_slug: ownProps.match.params,
  project_id: ownProps.match.params,
  experimentList: state.experimentList,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getExperiments, getProjectDetail }
)(withRouter(ExperimentList));
