import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import isEmpty from "../../validation/isEmpty";
//import moment from "moment";
import { getProjectDetail } from "../../actions/projectDetailActions";
import Graph from "../graph/Graph";
import ProjectTabs from "./ProjectTabs";

class ProjectFlow extends Component {
  componentDidMount() {
    const { organization_slug } = this.props.organization_slug;
    const { project_id } = this.props.project_id;
    const { projectDetail } = this.props.projectDetail;

    if (isEmpty(projectDetail)) {
      this.props.getProjectDetail(organization_slug, project_id);
    }
  }

  render() {
    //const { organization_slug } = this.props.organization_slug;
    //const { project_id } = this.props.project_id;
    const { selected_node } = this.props.graph;
    console.log(selected_node + "n");
    //let node = isEmpty(selected_node) ? "node" : selected_node.id;

    let containerHeight = window.innerHeight - 131;
    return (
      <div className="container-fluid" style={{ height: containerHeight }}>
        <div className="row" style={{ height: "35%" }}>
          <div className="col-1">
            <ul className="list-unstyled components">
              <li>
                Add data source
                {/*<a href="">Add data source</a>*/}
              </li>
              <li>
                Add ML Experiment
                {/*}<a href="#">Add ML Experiment</a>*/}
              </li>
            </ul>
          </div>
          <div className="col-11">
            <Graph {...this.props} />
          </div>
        </div>

        <div className="row" style={{ height: "65%" }}>
          <div className="col-12">
            <hr />
            <ProjectTabs {...this.props} />
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
  auth: PropTypes.object.isRequired,
  graph: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  projectDetail: state.projectDetail,
  organization_slug: ownProps.match.params,
  project_id: ownProps.match.params,
  auth: state.auth,
  graph: state.graph
});

export default connect(
  mapStateToProps,
  { getProjectDetail }
)(withRouter(ProjectFlow));
