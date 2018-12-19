import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getDataFramePreview } from "./dataFramePreviewActions";
import moment from "moment";
import ReactTable from "react-table";

class DataFramePreview extends Component {
  componentDidMount() {
    const { organization_slug } = this.props.organization_slug;
    const { project_id } = this.props.project_id;
    const { dataframe_id } = this.props.dataframe_id;
    this.props.getDataFramePreview(organization_slug, project_id, dataframe_id);
  }
  componentDidUpdate(prevProps) {}

  render() {
    const {
      preview_data,
      columns_description,
      nrows,
      ncols,
      loading,
      error_message
    } = this.props.dataFramePreview;
    console.log(loading, error_message);
    console.log(preview_data, nrows, ncols);
    console.log(columns_description);
    if (loading) {
      return (
        <div className="container">
          <div className="row">Loading DataFrame preview ...</div>
        </div>
      );
    }
    if (error_message !== "") {
      return (
        <div className="container">
          <div className="row">{{ error_message }}</div>
        </div>
      );
    }
    let columns = [];
    for (let i = 0; i < columns_description.length; i += 1) {
      console.log(columns_description[i]["name"]);
      columns.push({
        Header: () => <b>{columns_description[i]["name"]}</b>,
        accessor: columns_description[i]["name"]
      });
    }
    console.log(columns);
    console.log(preview_data.length);

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ReactTable
              data={preview_data}
              columns={columns}
              className="-highlight"
            />
          </div>
        </div>
      </div>
    );
  }
}

DataFramePreview.propTypes = {
  getDataFramePreview: PropTypes.func.isRequired,
  organization_slug: PropTypes.object.isRequired,
  project_id: PropTypes.object.isRequired,
  dataframe_id: PropTypes.object.isRequired,
  dataFramePreview: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  organization_slug: ownProps.match.params,
  project_id: ownProps.match.params,
  dataframe_id: ownProps.match.params,
  dataFramePreview: state.dataFramePreview,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getDataFramePreview }
)(withRouter(DataFramePreview));
