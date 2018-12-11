import axios from 'axios';
import { PROJECTS_LOADING, GET_PROJECTS } from './types';


let apiUrl;
(process.env.REACT_APP_API_URL!==undefined) ? apiUrl=process.env.REACT_APP_API_URL : apiUrl=""

// Get all projects
export const getProjects = (organization_slug) => dispatch => {
	dispatch(setProjectsLoading());
	axios
		.get('/api/v1/personal/projects') // ${organization_slug}
		.then(res =>
			dispatch({
				type: GET_PROJECTS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PROJECTS,
				payload: null
			})
		);
}


// Projects loading
export const setProjectsLoading = () => {
	return {
		type: PROJECTS_LOADING
	}
}
