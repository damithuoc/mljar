import React from "react";
import { connect } from "react-redux";
//import PropTypes from 'prop-types';

class FooterMain extends React.Component {
  onWebsocketDisconnectClick() {
    this.props.webSocketDisconnect();
  }
  render() {
    return (
      <footer className="footer">
        <div className="text-muted">MLJAR v0.0.1 - Use your data!</div>
      </footer>
    );
  }
}

FooterMain.propTypes = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(FooterMain);
