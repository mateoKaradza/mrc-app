import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getOrders } from '../actions/orders';

import OrderList from '../components/orders/order-list';

class Orders extends Component {
    constructor(props) {
        super(props);
        
        this.props.getOrders();
    }


    render() {
        return(
            <div> 
                <div className="p-b-1"><h2>Orders</h2></div>
                {this.props.orders.orders === null ? null : <OrderList orders={this.props.orders.orders} />}             
            </div>
        )
    }
}

function mapStateToProps({ orders }) {
    return { orders };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getOrders }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)