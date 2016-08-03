import React, { Component } from 'react';

export default class ErrorAlert extends Component {
    componentWillUnmount() {
        this.props.dismiss();
    }
    
    render() {
        return (
            <div className="alert alert-danger">
                {this.props.message}
            </div>
        )
    }
}
