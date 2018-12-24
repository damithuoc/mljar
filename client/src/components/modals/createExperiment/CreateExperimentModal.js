import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { createExperiment } from "./CreateExperimentActions";
import { getDataFrames } from "../../dataFrameList/dataFrameListActions";
import isEmpty from "../../../validation/isEmpty";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

class CreateExperimentModal extends React.Component {
  constructor(props) {
    console.log("alertmodal constructor");

    super(props);
    console.log(props);
    this.state = {
      isShow: true,
      title: "Experiment 1",
      selectedOption: null
    };
    this.onExist = this.onExit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitCreateExperiment = this.submitCreateExperiment.bind(this);
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log("Option selected:", selectedOption);
  };
  componentDidMount() {
    const { dataframes } = this.props.dataFrameList;
    if (isEmpty(dataframes)) {
      const { organization } = this.props.auth;
      const { projectDetail } = this.props.projectDetail;
      this.props.getDataFrames(organization.slug, projectDetail.id);
    }
  }

  createDataFrameItems() {
    const { dataframes } = this.props.dataFrameList;
    let items = [];
    for (let i = 0; i < dataframes.length; i++) {
      items.push(
        <option key={dataframes[i].id} value={dataframes[i].id}>
          DataFrame of {dataframes[i].source_title}
        </option>
      );
    }
    return items;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onExit() {
    console.log("on exit");
  }

  submitCreateExperiment() {
    console.log("submitCreateExperiment");
    /*title="exp 1",
      description="na na ...",
      params={
          "data_usage": {"train_absolute_path": mljar_df.absolute_path},
          "metric": {"optimize": "logloss", "monitor": ["logloss", "auc"]},
          "validation": {
              "validation_type": "split",
              "train_ratio": 0.5,
              "shuffle": True,
          },
          "preprocessing": {},
      },
      column_usage={
          "target": ["target"],
          "input": ["feature_{0}".format(i) for i in range(4)],
      },*/
  }

  render() {
    console.log("alertmodal itself" + this.props.open + this.state.isShow);
    //this.setState({ isShow: this.props.open });
    const { selectedOption } = this.state;

    return (
      <Modal
        isOpen={true}
        onExit={this.onExit}
        toggle={this.props.closeModal}
        size={"lg"}
      >
        <ModalHeader>Create Machine Learning Experiment</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Experiment title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={this.state.title}
                onChange={this.onChange}
                placeholder="Experiment title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="trainingDataFrame">Select training dataset</Label>
              <Input
                type="select"
                name="trainingDataFrame"
                id="trainingDataFrame"
              >
                {this.createDataFrameItems()}
              </Input>
            </FormGroup>

            <div className="container">
              <div className="row">
                <div className="col-4">
                  <Label>Model input</Label>
                  <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    isMulti={true}
                  />
                </div>

                <div className="col-4">
                  <Label>Target</Label>
                  <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    isMulti={true}
                  />
                </div>

                <div className="col-4">
                  <Label>Excluded</Label>
                  <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    isMulti={true}
                  />
                </div>
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.submitCreateExperiment}>
            Start ML Experiment
          </Button>{" "}
          <Button color="secondary" onClick={this.props.closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

//export default CreateExperimentModal;

CreateExperimentModal.propTypes = {
  projectDetail: PropTypes.object.isRequired,
  experimentList: PropTypes.object.isRequired,
  dataFrameList: PropTypes.object.isRequired,
  getDataFrames: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  projectDetail: state.projectDetail,
  experimentList: state.experimentList,
  dataFrameList: state.dataFrameList,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getDataFrames }
)(withRouter(CreateExperimentModal));
