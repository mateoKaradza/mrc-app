import React,  { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { redirecting } from '../actions/user';

class NotAuthenticated extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.isAuthenticated) {
            browserHistory.replace(nextProps.user.location);
        }
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h3>403 - Not Authenticated</h3>
                    <p>Oops, area restricted.</p>
                </div> 
            </div>
        )
    }
}

function mapStateToProps({ user }) {
    return ({ user });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ redirecting }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(NotAuthenticated);