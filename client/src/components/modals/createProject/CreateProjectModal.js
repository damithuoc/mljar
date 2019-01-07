import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { addProject } from "../../projectList/ProjectListActions";

import isEmpty from "../../../validation/isEmpty";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox
} from "availity-reactstrap-validation";

class CreateProjectModal extends React.Component {
  constructor(props) {
    console.log("CreateProjectModal constructor");

    super(props);
    console.log(props);
    this.state = {
      isShow: true,
      title: "",
      description: ""
    };
    this.onExist = this.onExit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event, errors, values) {
    this.setState({ errors, values });

    if (isEmpty(errors)) {
      const projectData = {
        title: this.state.title,
        description: this.state.description
      };

      this.props.addProject(projectData);
      this.props.closeModal();
    }
  }
  componentDidMount() {}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onExit() {}

  render() {
    return (
      <Modal
        isOpen={true}
        onExit={this.onExit}
        toggle={this.props.closeModal}
        size={"md"}
      >
        <ModalHeader>
          {" "}
          <i className="fa fa-rocket" aria-hidden="true" /> Create new project
        </ModalHeader>
        <AvForm onSubmit={this.handleSubmit}>
          <ModalBody>
            <AvGroup>
              <Label for="projTitle">Title</Label>
              <AvInput
                type="text"
                name="title"
                id="projTitle"
                placeholder="Name of your project"
                onChange={this.onChange}
                required
              />
              <AvFeedback>Title is required to create new project</AvFeedback>
            </AvGroup>

            <FormGroup>
              <Label for="projDesc">Description</Label>
              <Input
                type="textarea"
                rows={7}
                name="description"
                id="projDesc"
                onChange={this.onChange}
                placeholder="Description of project. What is your goal?"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button outline color="secondary" onClick={this.props.closeModal}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Create
            </Button>{" "}
          </ModalFooter>
        </AvForm>
      </Modal>
    );
  }
}

CreateProjectModal.propTypes = {
  addProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addProject }
)(withRouter(CreateProjectModal));
