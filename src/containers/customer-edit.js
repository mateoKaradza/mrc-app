import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCustomer, updateCustomer } from '../actions/the-customer';

import Input from '../components/other/input';

class CustomerEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer_id: null,
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            phone_number:  '',
            address: '',
            city: '',
            zip: '',
            state: '',
            country: '',
            notes: ''
        }

        this.props.getCustomer(this.props.params.id);

        this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        const customer = nextProps.theCustomer.customer;
        if (customer)
            this.setState({                 
                customer_id: customer.customer_id || null,
                first_name: customer.first_name || '',
                last_name: customer.last_name || '',
                username: customer.username || '',
                email: customer.email || '',
                phone_number: customer.phone_number || '',
                address: customer.address || '',
                city: customer.city || '',
                zip: customer.zip || '',
                state: customer.state || '',
                country: customer.country || '',
                notes: customer.notes || ''
            });
    }

    updateState(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = this.state;
        if (data.customer_id === null) delete data.customer_id;
        this.props.updateCustomer(data);
    }

    render() {
        let text = {};
        if (!this.props.theCustomer.customer) {
            text = {
                title: 'Create new Customer',
                submit: 'Create',       
            }     
        } else {
            text = {    
                title: 'Edit existing Customer',
                submit: 'Submit Changes'
            }
        }
        return(
            <div>
                <div className="p-b-1"><h2>{text.title}</h2></div>
                <form onSubmit={this.handleSubmit}>
                    <Input label="First Name" required value={this.state.first_name} stateKey="first_name" updateState={this.updateState}/>
                    <Input label="Last Name" required value={this.state.last_name} stateKey="last_name" updateState={this.updateState}/>
                    <Input label="Username" required value={this.state.username} stateKey="username" updateState={this.updateState}/>
                    <Input label="Email" required value={this.state.email} stateKey="email" updateState={this.updateState}/>
                    <Input label="Phone" value={this.state.phone_number} stateKey="phone_number" updateState={this.updateState}/>
                    <Input label="Address" value={this.state.address} stateKey="address" updateState={this.updateState}/>
                    <Input label="City" value={this.state.city} stateKey="city" updateState={this.updateState}/>
                    <Input label="State" value={this.state.state} stateKey="state" updateState={this.updateState}/>
                    <Input label="ZIP" value={this.state.zip} stateKey="zip" updateState={this.updateState}/>
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

function mapStateToProps({ theCustomer }) {
    return { theCustomer };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCustomer, updateCustomer }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CustomerEdit);