import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import classnames from 'classnames';

import { getProjects } from '../../actions/projectsActions';
//import { getCompletedTask } from '../../actions/tasksActions';
//import { deleteTask } from '../../actions/tasksActions';
import SplitPane from 'react-split-pane'
import SplitterLayout from 'react-splitter-layout';
import { Container, Row, Col } from 'reactstrap';

class ProjectView extends Component {

	componentDidMount() {
		//this.props.getProjects()
		console.log("did mount", this.props.id);
	}
	componentDidUpdate(prevProps) {

	}

	render() {
		console.log("id", this.props.id);
		return(
			<div>
				<SplitterLayout vertical percentage secondaryInitialSize={80} primaryMinSize={15}>
	        <div>Pane 1</div>
	        <div>Pane 2</div>
	      </SplitterLayout>
			</div>

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
