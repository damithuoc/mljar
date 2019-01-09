import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormGroup, Label, Input } from "reactstrap";
import { addProject } from "../../projectList/ProjectListActions";

//import isEmpty from "../../../validation/isEmpty";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";

class CreateProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      title: "",
      description: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }
  onCreate() {
    if (this.state.title !== "") {
      const projectData = {
        title: this.state.title,
        description: this.state.description
      };
      this.props.addProject(projectData);
      this.props.closeModal();
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Modal
        isOpen={true}
        toggle={this.props.closeModal}
        size={"md"}
        autoFocus={false}
      >
        <ModalHeader>
          {" "}
          <i className="fa fa-rocket" aria-hidden="true" /> Create new project
        </ModalHeader>
        <AvForm>
          <ModalBody>
            <AvGroup>
              <Label for="projTitle">Title</Label>
              <AvInput
                type="text"
                name="title"
                id="projTitle"
                placeholder="Name of your project"
                autoFocus={true}
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
            <Button color="primary" onClick={this.onCreate}>
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
