import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { filterVendors, dismissError } from '../actions/vendors';

import VendorList from '../components/vendors/vendor-list';
import Search from '../components/other/search';

class Customers extends Component {
    
    render() {
        return(
            <div>
                <h2>Vendor List</h2>
                <div className="row m-y-1">
                        <div className="col-md-7">
                            <Search action={this.props.filterVendors}/>
                        </div>
                        <div className="col-md-2 pull-xs-right">
                            <div className="pull-xs-right">
                                <Link to='/Vendors/New'><button className='btn btn-primary'><i className="fa fa-plus m-r-1"></i>New vendor</button></Link>
                            </div>
                        </div>
                </div>
                {this.props.vendors.new ? this.renderError() : null }
                <VendorList data={this.props.vendors} />
            </div>
        )
    }
}

function mapStateToProps({ vendors }) {
    return { vendors };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({filterVendors, dismissError}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);