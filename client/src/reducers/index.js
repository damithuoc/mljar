import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import projectsReducer from './projectsReducer';

export default combineReducers({
	auth: authReducer,
	errors: errorsReducer,
	projects: projectsReducer
});
