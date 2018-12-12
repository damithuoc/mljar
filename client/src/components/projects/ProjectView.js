import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import classnames from 'classnames';

import { getProjects } from '../../actions/projectsActions';
//import { getCompletedTask } from '../../actions/tasksActions';
//import { deleteTask } from '../../actions/tasksActions';

class ProjectView extends Component {

	componentDidMount() {
		//this.props.getProjects()
		console.log("did mount", this.props.id);
	}
	componentDidUpdate(prevProps) {

	}

	render() {
		return(
			<div><h1>Project details</h1></div>
		)
	}
}

ProjectView.propTypes = {
	id: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
	id: ownProps.match.params
});

export default connect(mapStateToProps)(withRouter(ProjectView));
