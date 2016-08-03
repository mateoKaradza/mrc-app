import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getOrder, getOrderItems, deleteOrderItem, deleteOrder } from '../actions/the-order';

import OrderItems from '../components/orders/order-items';
import OrderProfile from '../components/orders/order-profile';
import OrderSum from '../components/orders/order-sum';

class OrderDetail extends Component {
    constructor(props) {
        super(props);

        this.props.getOrder(this.props.params.id);
        this.props.getOrderItems(this.props.params.id);
        this.renderItems = this.renderItems.bind(this);
    }

    renderItems() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4 p-b-1">
                    <h2>Order Items</h2>
                    </div>
                    <div className="col-md-4 pull-xs-right">
                        <div className="pull-xs-right">
                            <Link to={'/Orders/' + this.props.theOrder.order.order_id + '/Items/New'}><button className='btn btn-primary'><i className="fa fa-plus m-r-1"></i>Add Item</button></Link>
                        </div>
                    </div>
                </div>
                {this.props.theOrder.items.length > 0 ? <OrderItems items={this.props.theOrder.items} item={this.props.theOrder.item} deleteItem={this.props.deleteOrderItem}/> : null}
                
            </div>
        )         
    }

    render() {
        return(
            <div>
                <OrderProfile data={this.props.theOrder.order} deleteOrder={this.props.deleteOrder} delete={this.props.theOrder.items.length === 0}/>
                <OrderSum items={this.props.theOrder.items} additionalCost={this.props.theOrder.order.additional_cost}/>
                {this.renderItems()}
            </div>
        )
    }
}

function mapStateToProps({ theOrder }) {
    return { theOrder };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getOrder, getOrderItems, deleteOrderItem, deleteOrder }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)