import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import isEmpty from "../../validation/isEmpty";
import moment from "moment";
import { getProjectDetail } from "../../actions/projectDetailActions";
import Graph from "../graph/Graph";

class ProjectFlow extends Component {
  componentDidMount() {
    const { organization_slug } = this.props.organization_slug;
    const { project_id } = this.props.project_id;
    const { projectDetail } = this.props.projectDetail;

    if (isEmpty(projectDetail)) {
      this.props.getProjectDetail(organization_slug, project_id);
    }
  }

  componentDidUpdate(prevProps) {}

  render() {
    const { organization_slug } = this.props.organization_slug;
    const { project_id } = this.props.project_id;

    let containerHeight = window.innerHeight - 131;
    return (
      <div className="container-fluid" style={{ height: containerHeight }}>
        <div className="row" style={{ height: "35%" }}>
          <div className="col-1">
            <ul class="list-unstyled components">
              <li>
                <a href="#">Add data source</a>
              </li>
              <li>
                <a href="#">Add ML Experiment</a>
              </li>
            </ul>
          </div>
          <div className="col-11">
            <Graph />
          </div>
        </div>

        <div className="row" style={{ height: "65%" }}>
          <div className="col-12">
            <hr />
            <h3>Panels</h3>
          </div>
        </div>
      </div>
    );
  }
}

ProjectFlow.propTypes = {
  projectDetail: PropTypes.object.isRequired,
  getProjectDetail: PropTypes.func.isRequired,
  organization_slug: PropTypes.object.isRequired,
  project_id: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  projectDetail: state.projectDetail,
  organization_slug: ownProps.match.params,
  project_id: ownProps.match.params,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProjectDetail }
)(withRouter(ProjectFlow));
