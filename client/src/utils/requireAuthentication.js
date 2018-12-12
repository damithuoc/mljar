import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';

export default function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        static propTypes = {
            isAuthenticated: PropTypes.bool.isRequired,
            location: PropTypes.shape({
                pathname: PropTypes.string.isRequired
            }).isRequired,
            dispatch: PropTypes.func.isRequired
        };

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            console.log("checkAuth", this.props.isAuthenticated);
            if (!this.props.isAuthenticated) {
                const redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            token: state.auth.token
        };
    };

    return connect(mapStateToProps)(AuthenticatedComponent);
}
