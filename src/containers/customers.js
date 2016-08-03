import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { filterCustomers, dismissError } from '../actions/customers';

import CustomerList from '../components/customers/customer-list';
import Search from '../components/other/search';
import ErrorAlert from '../components/other/error-alert';

class Customers extends Component {
    
    render() {
        return(
            <div>
                <h2>Customer List</h2>
                <div className="row m-y-1">
                        <div className="col-md-7">
                            <Search action={this.props.filterCustomers}/>
                        </div>
                        <div className="col-md-2 pull-xs-right">
                            <div className="pull-xs-right">
                                <Link to='/Customers/New'><button className='btn btn-primary'><i className="fa fa-plus m-r-1"></i>New customer</button></Link>
                            </div>
                        </div>
                </div>
                {this.props.customers.new ? <ErrorAlert message={this.props.customers.err} dismiss={this.props.dismissError}/> : null }
                <CustomerList data={this.props.customers} />
            </div>
        )
    }
}

function mapStateToProps({ customers }) {
    return { customers };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({filterCustomers, dismissError}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);