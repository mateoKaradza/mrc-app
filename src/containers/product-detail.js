import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getProduct, getProductOrders, getProductSupplies, deleteProduct } from '../actions/the-product';

import OrderList from '../components/orders/order-list';
import SupplyList from '../components/vendors/supply-list';
import ProductProfile from '../components/products/product-profile';

class OrderDetail extends Component {
    constructor(props) {
        super(props);

        this.props.getProduct(this.props.params.id);
        this.props.getProductOrders(this.props.params.id);
        this.props.getProductSupplies(this.props.params.id);
    }

    renderOrders() {
        return (
            <div>
                <div className="p-b-1"><h2>Orders</h2></div>
                <OrderList orders={this.props.theProduct.orders} />
            </div>
        )         
    }

    renderSupplies() {
        return (
            <div>
                <div className="p-b-1"><h2>Supplies</h2></div>
                <SupplyList supplies={this.props.theProduct.supplies} />
            </div>
        )         
    }

    render() {
        let theProduct = this.props.theProduct;
        return(
            <div>
                <ProductProfile data={theProduct.product} delete={theProduct.supplies.length === 0 && theProduct.orders.length === 0} deleteProduct={this.props.deleteProduct}/>
                {theProduct.supplies.length > 0 ? this.renderSupplies() : null}
                {theProduct.orders.length > 0 ? this.renderOrders() : null}
            </div>
        )
    }
}

function mapStateToProps({ theProduct }) {
    return { theProduct };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProduct, getProductOrders, getProductSupplies, deleteProduct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)