import React, { Component } from 'react';

export default class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    renderLogin() {
        return <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" 
                            className="form-control"
                            placeholder="username"
                            onChange={(e) => this.setState({username: e.target.value})}/>
                        <input 
                            type="password" 
                            className="form-control m-r-1" 
                            placeholder="******"
                            onChange={(e) => this.setState({password: e.target.value})}/>
                        <button type="submit" className="btn btn-secondary">Login</button>
                    </div>
                </form>
    }

    render() {
        return(
            <div>
                {this.renderLogin()}
            </div>
        )
    }
}