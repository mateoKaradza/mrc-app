import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getVendor, updateVendor } from '../actions/the-vendor';

import Input from '../components/other/input';

class VendorEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vendor_id: null,
            name: '',
            contact_person: '',
            phone_number: '',
            address: '',
            website:  '',
            email: '',
            country: '',
            notes: ''
        }

        this.props.getVendor(this.props.params.id);

        this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        const vendor = nextProps.theVendor.vendor;
        if (vendor)
            this.setState({                 
                vendor_id: vendor.vendor_id,
                name: vendor.name || '',
                contact_person: vendor.contact_person || '',
                phone_number: vendor.phone_number || '',
                address: vendor.address || '',
                website:  vendor.website || '',
                email: vendor.email || '',
                country: vendor.country || '',
                notes: vendor.notes || ''
            });
    }

    updateState(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = this.state;
        if (data.vendor_id === null) delete data.vendor_id;
        this.props.updateVendor(data);
    }

    render() {
        let text = {};
        if (!this.props.theVendor.vendor) {
            text = {
                title: 'Create new Vendor',
                submit: 'Create',       
            }     
        } else {
            text = {    
                title: 'Edit existing Vendor',
                submit: 'Submit Changes'
            }
        }
        return(
            <div>
                <div className="p-b-1"><h2>{text.title}</h2></div>
                <form onSubmit={this.handleSubmit}>
                    <Input label="Name" required value={this.state.name} stateKey="name" updateState={this.updateState}/>
                    <Input label="Contact Person" value={this.state.contact_person} stateKey="contact_person" updateState={this.updateState}/>
                    <Input label="Phone Nummber" value={this.state.phone_number} stateKey="phone_number" updateState={this.updateState}/>
                    <Input label="Address" value={this.state.address} stateKey="address" updateState={this.updateState}/>
                    <Input label="Website" value={this.state.website} stateKey="website" updateState={this.updateState}/>
                    <Input label="Email" value={this.state.email} stateKey="email" updateState={this.updateState}/>
                    <Input label="Country" value={this.state.country} stateKey="country" updateState={this.updateState}/>
                    <Input label="Notes" textarea value={this.state.notes} stateKey="notes" updateState={this.updateState}/>
                <div className="pull-xs-right form-group p-t-1">
                    <button type="submit" className="btn btn-primary" onSubmit={this.handleSubmit}>{text.submit}</button>
                </div>
                </form>
             </div>     
        )
    }
}

function mapStateToProps({ theVendor }) {
    return { theVendor };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getVendor, updateVendor }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(VendorEdit);