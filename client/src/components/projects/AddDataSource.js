import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import isEmpty from "../../validation/isEmpty";

import TextFieldGroup from "../common/TextFieldGroup";

//import { addProject } from '../../actions/projectsActions';
import { Label } from "reactstrap";

class AddDataSourceView extends Component {
  constructor(props) {
    console.log("AddDataSourceView");
    super(props);
    this.state = {
      params: {},
      title: "",
      description: "",
      file_name: "",
      uploadStatusMsg: "",
      loaded: 0,
      errors: {
        params: {}
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log(
      "AddDataSourceView",
      this.props.auth.user.username,
      this.props.projectDetail.projectDetail
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.errors)) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    //const projectData = {
    //  title: this.state.title,
    //  description: this.state.description
    //};
    console.log("onSubmit get upload destination", this.state.file_name);
    //this.props.addProject(projectData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const { projectDetail } = this.props.projectDetail;
    console.log("render", projectDetail, isEmpty(projectDetail));
    if (isEmpty(projectDetail)) {
      return (
        <div>
          <h3>
            Can not add new data source. Sorry! Please select a project first.{" "}
          </h3>
          <Link to="/projects" className="btn btn-default mt-2">
            Back to projects list
          </Link>
        </div>
      );
    }
    const link_back = "/project/" + projectDetail.id;
    console.log(link_back, "back");
    return (
      <div className="container">
        <h1>Add data source</h1>
        <hr />
        {"non_field_errors" in errors && (
          <div className="badge badge-danger mb-3">
            {errors.non_field_errors}
          </div>
        )}

        <p>Data upload from CSV file</p>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Data source name"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
            error={"params" in errors ? errors.params.arg1 : []}
          />
          <TextFieldGroup
            placeholder="Description of data source"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            error={"params" in errors ? errors.params.arg2 : []}
          />
          <Label>Please choose a file</Label>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              name="file_name"
              placeholder="Please selected a CSV file"
              onChange={this.onChange}
            />
            <label class="custom-file-label" for="customFile">
              Choose file
            </label>
          </div>
          <div> Upload progress: {Math.round(this.state.loaded, 2)} %</div>
          {this.state.uploadStatusMsg ? (
            <p>{this.state.uploadStatusMsg}</p>
          ) : (
            <p>Nothing yet</p>
          )}
          <input type="submit" value="Submit" className="btn btn-info mt-2" />
          <Link to={link_back} className="btn btn-default mt-2">
            Back
          </Link>
        </form>
      </div>
    );
  }
}

AddDataSourceView.propTypes = {
  //addProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  projectDetail: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  projectDetail: state.projectDetail
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(AddDataSourceView));
