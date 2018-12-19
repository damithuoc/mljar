import React, { Component } from "react";

import {
  CardDeck,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Home extends Component {
  render() {
    const { isAuthenticated, user, organization } = this.props.auth;

    const projects_card = (
      <Col sm="6" style={{ padding: "15px" }}>
        <Card body>
          <CardTitle>Projects</CardTitle>
          <CardText>List you data science projects</CardText>

          <Link
            to={"/" + organization.slug + "/projects/"}
            className="btn btn-primary mt-2 btn-block"
          >
            Open projects
          </Link>
        </Card>
      </Col>
    );
    const login_card = (
      <Col sm="6" style={{ padding: "15px" }}>
        <Card body>
          <CardTitle>Please login</CardTitle>
          <CardText>Please login to see your projects</CardText>
          <Link to="/login/" className="btn btn-primary mt-2 btn-block">
            Login
          </Link>
        </Card>
      </Col>
    );

    return (
      <div className="container text-center">
        <h1>MLJAR</h1>
        <h4>Turn your data into knowledge!</h4>
        <div className="container-fluid">
          <Row>
            {isAuthenticated ? projects_card : login_card}
            <Col sm="6" style={{ padding: "15px" }}>
              <Card body>
                <CardTitle>Documentation</CardTitle>
                <CardText>Check our documentation and FAQ</CardText>

                <a
                  href="https://github.com/mljar/mljar/wiki"
                  target="_blank"
                  className="btn btn-info mt-2 btn-block"
                >
                  Open documentation
                </a>
              </Card>
            </Col>
            <Col sm="6" style={{ padding: "15px" }}>
              <Card body>
                <CardTitle>Got feature request or found a bug?</CardTitle>
                <CardText>
                  Please submit the issue at our github. Looking forward to hear
                  more!
                </CardText>
                <a
                  href="https://github.com/mljar/mljar/issues"
                  target="_blank"
                  className="btn btn-secondary mt-2 btn-block"
                >
                  Submit issue
                </a>
              </Card>
            </Col>
            <Col sm="6" style={{ padding: "15px" }}>
              <Card body>
                <CardTitle>Need support?</CardTitle>
                <CardText>
                  Check out our support forum and ask help from our community.
                </CardText>

                <a
                  href="https://github.com/mljar/mljar/issues"
                  target="_blank"
                  className="btn btn-secondary mt-2 btn-block"
                >
                  Go to support forum
                </a>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Home));
