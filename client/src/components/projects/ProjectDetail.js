import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getProjectDetail } from "../../actions/projectDetailActions";
import moment from "moment";

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

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h4>Project {projectDetail.title}</h4>
            <p>{projectDetail.description}</p>
            <Link to="/flow/" className="btn btn-primary mt-2">
              Open FLOW
            </Link>
          </div>
          <div className="col">
            {" "}
            <small>
              Created at:{" "}
              {moment(projectDetail.created_at).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}{" "}
              by {projectDetail.created_by_username}
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
            <Link to={"/project/" + projectDetail.id + "/datasources/"}>
              List
            </Link>{" "}
            | <Link to="/datasources/add/">Add new</Link>
            <br />
            <br />
          </div>
          <div className="col-3">
            <h5>Data frames</h5>
            <h2>{projectDetail.dataframes_cnt}</h2>
            <Link to="/dataframes/">List</Link>
          </div>

          <div className="col-3">
            <h5>ML experiments</h5>
          </div>
          <div className="col-3">
            <h5>ML models</h5>
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
          <div className="col-3">
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
