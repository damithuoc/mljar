import React from 'react';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import rootReducer from './reducers';

import { createBrowserHistory } from 'history'

import { ConnectedRouter } from 'connected-react-router'

export default({ children, initialState={} }) => {
	const middleware = [thunk];
	const history = createBrowserHistory();

	const store = createStore(
		rootReducer(history),
		initialState,
		composeWithDevTools(
			applyMiddleware(
				routerMiddleware(history),
				...middleware
			),
		)
	);

	// Check for token
	if(localStorage.authTokenKey) {
	  // Set auth token header auth
	  setAuthToken(localStorage.authTokenKey);
	  // Set user and isAuthenticated
	  store.dispatch(setCurrentUser(""));
	}

	return(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				{children}
			</ConnectedRouter>
		</Provider>
	);
};
