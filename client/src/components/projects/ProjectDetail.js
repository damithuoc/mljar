import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import classnames from 'classnames';

import { getProjectDetail } from '../../actions/projectDetailActions';
//import { getCompletedTask } from '../../actions/tasksActions';
//import { deleteTask } from '../../actions/tasksActions';
import SplitPane from 'react-split-pane'
import SplitterLayout from 'react-splitter-layout';
import { Container, Row, Col } from 'reactstrap';

class ProjectView extends Component {

	componentDidMount() {
		this.props.getProjectDetail(this.props.auth.organization.slug, this.props.id.id);
		console.log("ProjectDetail did mount", this.props.id, this.props.auth);
	}
	componentDidUpdate(prevProps) {

	}

	onAddDataSource() {
		console.log("add data source");

	}

	render() {
		console.log("id", this.props.id);
		const { title } = this.props.projectDetail;
		return(
			<div>
				<SplitterLayout vertical percentage secondaryInitialSize={80} primaryMinSize={15}>
			        <div>{this.props.auth.username}</div>
			        <div>
					<h3>{ title }</h3>

					<div className="col-md-2">
						<Link to="/datasources/add/" className="btn btn-primary mt-2 btn-block">Add data source</Link>
					</div>

					</div>
			      </SplitterLayout>
			</div>

		)
	}
}

ProjectView.propTypes = {
	id: PropTypes.object.isRequired, // id of the project
	getProjectDetail: PropTypes.func.isRequired,
	projects: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	projectDetail: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
	id: ownProps.match.params,
	projects: state.projects,
	auth: state.auth,
	projectDetail: state.projectDetail
});


export default connect(mapStateToProps, { getProjectDetail })(withRouter(ProjectView));
