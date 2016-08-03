import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getVendor, getSupplies, deleteVendor, deleteSupply } from '../actions/the-vendor';

import VendorProfile from '../components/vendors/vendor-profile';
import SuppliesList from '../components/vendors/supply-list';

class VendorDetail extends Component {
    constructor(props) {
        super(props);

        this.props.getVendor(this.props.params.id);
        this.props.getSupplies(this.props.params.id);
        
        this.renderSupplies = this.renderSupplies.bind(this);
    }

    renderSupplies() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4 p-b-1">
                    <h2>Supplies</h2>
                    </div>
                </div>
                <SuppliesList supplies={this.props.theVendor.supplies} deleteSupply={this.props.deleteSupply}/>
            </div>
        )         
    }

    render() {
        return(
            <div>
                <VendorProfile data={this.props.theVendor.vendor} deleteVendor={this.props.deleteVendor} delete={this.props.theVendor.supplies.length === 0}/>
                {this.props.theVendor.supplies.length > 0 ? this.renderSupplies() : null}
            </div>
        )
    }
}

function mapStateToProps({ theVendor }) {
    return { theVendor };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getVendor, getSupplies, deleteVendor, deleteSupply }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorDetail)