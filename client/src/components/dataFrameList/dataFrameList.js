import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getDataFrames } from "./dataFrameListActions";
import moment from "moment";

class DataFrameList extends Component {
  componentDidMount() {
    const { organization_slug } = this.props.organization_slug;
    const { project_id } = this.props.project_id;
    this.props.getDataFrames(organization_slug, project_id);
  }
  componentDidUpdate(prevProps) {}

  render() {
    const { organization_slug } = this.props.organization_slug;
    const { project_id } = this.props.project_id;
    const { dataframes, loading } = this.props.dataFrameList;
    let items;

    if (loading) {
      items = <div>Loading DataFrames ...</div>;
    } else {
      if (dataframes.length > 0) {
        items = dataframes.map(dataframe => {
          return (
            <div className="border-bottom" key={dataframe.id}>
              <div className="row mb-3 mt-3">
                <div className="col-9">
                  <h4>
                    DataFrame: {dataframe.id} <br />
                  </h4>
                  <b>File size:</b> {dataframe.file_size} MB <br />
                  <b>Created at:</b>{" "}
                  {moment(dataframe.created_at).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}{" "}
                  <br />
                  <b>Last update:</b> {moment(dataframe.updated_at).fromNow()}{" "}
                  <br />
                  <b>Data source:</b> {dataframe.source_title} <br />
                  <small>(Id: {dataframe.id})</small>
                  <br />
                </div>

                <div className="col-3">
                  <Link
                    to={
                      "/" +
                      organization_slug +
                      "/project/" +
                      project_id +
                      "/dataframe_preview/" +
                      dataframe.id
                    }
                    className="btn btn-success btn-md float-right"
                  >
                    Preview
                  </Link>{" "}
                </div>
              </div>
            </div>
          );
        });
      } else {
        items = <div>DataFrames list is empty</div>;
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h1>DataFrames</h1>
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

DataFrameList.propTypes = {
  getDataFrames: PropTypes.func.isRequired,
  organization_slug: PropTypes.object.isRequired,
  project_id: PropTypes.object.isRequired,
  dataFrameList: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  organization_slug: ownProps.match.params,
  project_id: ownProps.match.params,
  dataFrameList: state.dataFrameList,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getDataFrames }
)(withRouter(DataFrameList));
