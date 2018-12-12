import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import projectsReducer from './projectsReducer';

export const rootReducer = (history) => combineReducers({
	router: connectRouter(history),
	auth: authReducer,
	errors: errorsReducer,
	projects: projectsReducer
});
