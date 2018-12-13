import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import classnames from 'classnames';

import { getProjects, openProject } from '../../actions/projectsActions';
//import { getCompletedTask } from '../../actions/tasksActions';
//import { deleteTask } from '../../actions/tasksActions';
import moment from 'moment';

class Projects extends Component {

	componentDidMount() {
		this.props.getProjects()
	}
	componentDidUpdate(prevProps) {

	}
	onOpenProject(id) {
		console.log("open project", id);
		this.props.openProject(id);
	}

	render() {
		const { projects, loading } = this.props.projects;
		let projectsItems;

		if(projects === null || loading) {
			projectsItems = <div>Loading projects...</div>
		} else {
			if(projects.length > 0) {
				projectsItems = projects.map(project => {

					return(
						<div className="border-bottom" key={project.id}>
							<div className="row mt-3 mb-3">
								<div className="col-md-8">

									<h3>{project.title} <br/></h3>
									<b>Description:</b> {project.description} <br/>
									<b>Created at:</b> {moment(project.created_at).format('MMMM Do YYYY, h:mm:ss a')} <br/>
									<b>Last update at:</b> {moment(project.updated_at).fromNow()} <br/>
									<b>Created by:</b> {project.created_by_username} <br/>
									(Id: {project.id})<br/>


								</div>

								<div className="col-md-1">
									<button
										className="btn btn-success btn-sm"
										onClick={this.onOpenProject.bind(this, project.id)}
									>
										Open project
									</button>
								</div>
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
						<Link to="/projects/add/" className="btn btn-primary mt-2 btn-block">Add project</Link>
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
	openProject: PropTypes.func.isRequired,

	//getCompletedTask: PropTypes.func.isRequired,
	//deleteTask: PropTypes.func.isRequired,
	projects: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
	projects: state.projects,
	auth: state.auth
});

export default connect(mapStateToProps, { getProjects, openProject })(withRouter(Projects));
