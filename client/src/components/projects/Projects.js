import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import classnames from 'classnames';

import { getProjects } from '../../actions/projectsActions';
//import { getCompletedTask } from '../../actions/tasksActions';
//import { deleteTask } from '../../actions/tasksActions';

class Projects extends Component {

	componentDidMount() {

		this.props.getProjects()
	}
	componentDidUpdate(prevProps) {
		//if(this.props.tasks.completedTask!==prevProps.tasks.completedTask) {
		//	this.props.getCompletedTask(this.props.tasks.completedTask);
		//}
	}
	onDeleteClick(id) {
		//this.props.deleteTask(id);
	}

	render() {
		const { projects, loading } = this.props.projects;
		let projectsItems;
		//console.log(this.props)

		if(projects === null || loading) {
			projectsItems = <div>Loading projects...</div>
		} else {
			if(projects.length > 0) {
				projectsItems = projects.map(project => {

					return(
						<div className="border-bottom" key={project.id}>
							<div className="row mt-3 mb-3">
								<div className="col-md-8">
									<b>Id:</b> {project.id} <br/>
								</div>

								{/*}<div className="col-md-1">
									<button
										className="btn btn-default btn-sm"
										onClick={this.onDeleteClick.bind(this, task.id)}
									>
										Delete
									</button>
								</div>*/}
							</div>
						</div>
					)
				});
			} else {
				projectsItems = <div>Projects list is empty</div>
			}
		}


		return(
			<div className="container">
				<div className="row">
					<div className="col-md-10">
						<h1>Projects {this.props.auth.organization.name}</h1>
					</div>

					<div className="col-md-2">
						<Link to="#" className="btn btn-primary mt-2 btn-block">Add project</Link>
					</div>

				</div>
				<hr/>
				{projectsItems}
			</div>
		)
	}
}

Projects.propTypes = {
	getProjects: PropTypes.func.isRequired,
	//getCompletedTask: PropTypes.func.isRequired,
	//deleteTask: PropTypes.func.isRequired,
	projects: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
	projects: state.projects,
	auth: state.auth
});

export default connect(mapStateToProps, { getProjects })(withRouter(Projects));
