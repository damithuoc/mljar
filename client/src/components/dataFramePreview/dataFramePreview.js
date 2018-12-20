import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getDataFramePreview } from "./dataFramePreviewActions";
import { getProjectDetail } from "../../actions/projectDetailActions";
import isEmpty from "../../validation/isEmpty";

import ReactTable from "react-table";
import classnames from "classnames";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";

class DataFramePreview extends Component {
  componentDidMount() {
    const { organization_slug } = this.props.organization_slug;
    const { project_id } = this.props.project_id;
    const { dataframe_id } = this.props.dataframe_id;
    const { projectDetail } = this.props.projectDetail;

    if (isEmpty(projectDetail)) {
      this.props.getProjectDetail(organization_slug, project_id);
    }
    this.props.getDataFramePreview(organization_slug, project_id, dataframe_id);
  }
  componentDidUpdate(prevProps) {}

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    const { organization_slug } = this.props.organization_slug;
    const { project_id } = this.props.project_id;
    const {
      source_title,

      preview_data,
      columns_description,
      nrows,
      ncols,
      loading,
      error_message
    } = this.props.dataFramePreview;

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
      columns.push({
        Header: () => <b>{columns_description[i]["name"]}</b>,
        accessor: columns_description[i]["name"]
      });
    }

    const link_frames = (
      <div className="col-12">
        <Link
          to={
            "/" + organization_slug + "/project/" + project_id + "/dataframes/"
          }
          style={{ padding: "8px" }}
        >
          {"<<"} Back
        </Link>
      </div>
    );
    const links_sources_frames = (
      <div className="col-4">
        <Link
          to={
            "/" + organization_slug + "/project/" + project_id + "/dataframes/"
          }
          className="float-right"
          style={{ padding: "8px" }}
        >
          DataFrames
        </Link>
        <Link
          to={
            "/" + organization_slug + "/project/" + project_id + "/datasources/"
          }
          className="float-right"
          style={{ padding: "8px" }}
        >
          DataSources
        </Link>
      </div>
    );

    let columnItems = columns_description.map((desc, index) => {
      return (
        <div className="border-bottom" key={index}>
          <div className="row mb-3 mt-3">
            <div className="col-3">
              <h5>
                Column: {desc.name} <br />
              </h5>
            </div>
            <div className="col-3">
              <h5>
                Type: {desc.type} <br />
              </h5>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-5">
            <h4>DataFrame of DataSource: {source_title} </h4>
          </div>

          <div className="col-3">
            <p>
              <strong>#Rows:</strong> {nrows} <strong>#Columns:</strong> {ncols}
            </p>
          </div>
          {links_sources_frames}
          <div className="col-12">
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    Columns description
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    Spreadsheet preview
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">{columnItems}</Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <small>Preview of first 100 rows</small>
                      <ReactTable
                        data={preview_data}
                        columns={columns}
                        className="-highlight"
                      />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>
          {link_frames}
        </div>
      </div>
    );
  }
}

DataFramePreview.propTypes = {
  projectDetail: PropTypes.object.isRequired,
  getProjectDetail: PropTypes.func.isRequired,
  getDataFramePreview: PropTypes.func.isRequired,
  organization_slug: PropTypes.object.isRequired,
  project_id: PropTypes.object.isRequired,
  dataframe_id: PropTypes.object.isRequired,
  dataFramePreview: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  projectDetail: state.projectDetail,
  organization_slug: ownProps.match.params,
  project_id: ownProps.match.params,
  dataframe_id: ownProps.match.params,
  dataFramePreview: state.dataFramePreview,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getDataFramePreview, getProjectDetail }
)(withRouter(DataFramePreview));
