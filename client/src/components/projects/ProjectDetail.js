import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getProjectDetail } from "../../actions/projectDetailActions";
import SplitterLayout from "react-splitter-layout";
//import { Container, Row, Col } from "reactstrap";

class ProjectView extends Component {
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
    const { projectDetail } = this.props.projectDetail;
    const { user } = this.props.auth;
    return (
      <div>
        <SplitterLayout
          vertical
          percentage
          secondaryInitialSize={80}
          primaryMinSize={15}
        >
          <div>{user.username}</div>
          <div>
            <h3>
              Project {projectDetail.title} (id: {projectDetail.id})
            </h3>
            <div className="col-md-2">
              <Link
                to="/datasources/add/"
                className="btn btn-primary mt-2 btn-block"
              >
                Add data source
              </Link>
            </div>
          </div>
        </SplitterLayout>
      </div>
    );
  }
}

ProjectView.propTypes = {
  id: PropTypes.object.isRequired, // id of the project
  getProjectDetail: PropTypes.func.isRequired,
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
  { getProjectDetail }
)(withRouter(ProjectView));
