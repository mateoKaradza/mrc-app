import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCustomer, getOrders, getPurchasedItems, deleteCustomer } from '../actions/the-customer';

import CustomerProfile from '../components/customers/customer-profile';
import OrderList from '../components/orders/order-list';
import PurchasedProducts from '../components/customers/purchased-products';

class CustomerDetail extends Component {
    constructor(props) {
        super(props);

        this.props.getCustomer(this.props.params.id);
        this.props.getOrders(this.props.params.id);
        this.props.getPurchasedItems(this.props.params.id);
        
        this.renderOrders = this.renderOrders.bind(this);
        this.renderItems = this.renderItems.bind(this);
    }

    renderOrders() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4 p-b-1">
                    <h2>Orders</h2>
                    </div>
                </div>
                <OrderList orders={this.props.theCustomer.orders} />
            </div>
        )         
    }

    renderItems() {
        return (
            <div>
                <div className="p-b-1"><h2>Products Bought</h2></div>
                <PurchasedProducts items={this.props.theCustomer.items} />
            </div>
        )         
    }

    render() {
        return(
            <div>
                <CustomerProfile data={this.props.theCustomer.customer} deleteCustomer={this.props.deleteCustomer} delete={this.props.theCustomer.orders.length === 0}/>
                {this.props.theCustomer.orders.length > 0 ? this.renderOrders() : null}
                {this.props.theCustomer.items.length > 0 ? this.renderItems() : null}
            </div>
        )
    }
}

function mapStateToProps({ theCustomer }) {
    return { theCustomer };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCustomer, getOrders, getPurchasedItems, deleteCustomer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail)