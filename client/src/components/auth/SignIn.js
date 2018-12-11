import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signInUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class SignIn extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			//username: this.state.username,
			email: this.state.email,
			password: this.state.password
		}

		this.props.signInUser(userData);

	}

	render() {

		const { errors } = this.state;

		return(
			<div className="sing-in">
		    <div className="container">
		      <div className="row">
		        <div className="col-md-8 m-auto">
		          <h1 className="display-4 text-center">Sign In</h1>
		          <p className="lead text-center">Sign in to your MLJAR account</p>
		          {('non_field_errors' in errors) && <div className="badge badge-danger mb-3">{errors.non_field_errors}</div>}

		          <form noValidate onSubmit={this.onSubmit}>
		            <TextFieldGroup
									placeholder="Email"
									name="email"
									type="email"
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
								/>

		            <TextFieldGroup
									placeholder="Password"
									name="password"
									type="password"
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>

		            <input type="submit" className="btn btn-info btn-block mt-4" value="Submit" />
		          </form>

		        </div>
		      </div>
		    </div>
		  </div>
		)
	}
}

SignIn.propTypes = {
	signInUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { signInUser })(SignIn);
