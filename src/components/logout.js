import React, { Component } from 'react';

export default class LoggedIn extends Component{
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout()
    }

    renderLogout() {
        return (
            <div>
                <span className="btn btn-secondary"onClick={() => this.handleLogout()}>Logout</span>
            </div>
        )
    }   

    render() {
        return(
            <div>
                {this.renderLogout()}
            </div>
        )
    }
}