import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
	render() {
		return(
			<div className="container text-center">
				<h1>Home</h1>
				<Link to="/sign-in">View tasks</Link>
			</div>
		)
	}
}

export default Home;
