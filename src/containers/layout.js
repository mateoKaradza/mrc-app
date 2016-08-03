import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { authenticate, logout, login, verify } from '../actions/user';

import Login from '../components/login';
import Logout from '../components/logout';

class Layout extends Component {
    constructor(props) {
        super(props);

        this.authenticate = this.authenticate.bind(this);

        this.state = {
            authenticated: false
        }

        if (this.props.user.isAuthenticated === false) {
            this.props.verify();
        }
    }

    authenticate() {
        this.setState({
            authenticated: !this.state.authenticated
        })
    }
    render() {
        const contentStyle = {
            marginTop: '10px',
            paddingTop: '15px'
        }

        return ( 
            <div className='container'>
                <div className='row'>
                    <nav className="navbar navbar-light bg-faded">
                        <div className="nav navbar-nav">
                            <Link to='/' className='navbar-brand' activeClassName='active'>MRC TOOL</Link> 
                            <Link to='/Customers' className='nav-link nav-item' activeClassName='active'>Customers</Link>
                            <Link to='/Orders' className='nav-link nav-item' activeClassName='active'>Orders</Link>
                            <Link to='/Products' className='nav-link nav-item' activeClassName='active'>Products</Link>
                            <Link to='/Vendors' className='nav-link nav-item' activeClassName='active'>Vendors</Link>
                            <div className="pull-xs-right">
                                {this.props.user.isAuthenticated === true ? <Logout logout={this.props.logout} /> : <Login login={this.props.login} />}
                            </div>   
                        </div>
                    </nav>
                </div>
                <div className="row card" style={contentStyle}>
                    <div className="col-md-12">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({authenticate, logout, login, verify}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);