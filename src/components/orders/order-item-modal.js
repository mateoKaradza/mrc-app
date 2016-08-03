import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { insertOrderItem, editOrderItemSelect } from '../../actions/the-order';
import { filterProducts } from '../../actions/products';

import Input from '../other/input';
import Search from '../search';
import ProductList from '../products/product-list';

class OrderItemModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order_details_id: this.props.data.order_details_id || null, // key
            order_id: this.props.data.order_id, // required
            product_id: this.props.data.product_id, 
            price: this.props.data.price || 0,
            quantity: this.props.data.quantity || 0,
            first_stone_earning: this.props.data.first_stone_earning || 0,
            second_stone_earning: this.props.data.second_stone_earning || 0,
            third_stone_earning: this.props.data.third_stone_earning || 0,
            inventory_cost: this.props.data.inventory_cost || 0,
            feedback_message: this.props.data.feedback_message || ''
        }

        this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderSearch = this.renderSearch.bind(this);
        this.populate = this.populate.bind(this);
    }

    updateState(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit() {
        let data = this.state;
        if (data.order_details_id === null) delete data.order_details_id;
        this.props.insertOrderItem(data);
    }

    populate(item) {
        this.setState({
            product_id: item.product_id,
            price: item.default_price,
            first_stone_earning: item.first_stone_earning,
            second_stone_earning: item.second_stone_earning,
            third_stone_earning: item.third_stone_earning,
            inventory_cost: item.inventory_cost,
            feedback_message: item.feedback_message
        })
    }
    renderSearch() {
        return (
            <div>
                <div className="row m-y-1">
                    <div className="col-md-7">
                        <Search action={this.props.filterProducts}/>
                    </div>
                    <div className="col-md-2">
                        <span className='btn btn-secondary' data-toggle="modal" data-target="#productModal"><i className="fa fa-plus m-r-1"></i>New product</span>
                    </div>
                </div>
                <ProductList data={this.props.products} selectedItem={this.props.theOrder.item} addItem={this.populate}/>
            </div>
        )
    }

    render() {
        let text = {};
        if (this.props.type === 'ADD') {
            text = {
                modalTitle: 'Create new Order Item',
                submit: 'Create',       
            }     
        } else {
            text = {    
                modalTitle: 'Edit existing Order Item',
                submit: 'Submit Changes'
            }
        }

        return (
            <div className="modal fade" id={this.props.target} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">{text.modalTitle}</h4>
                        </div>
                        <div className="modal-body">
                            {this.state.order_details_id === null ? this.renderSearch() : null}
                            <div>
                                <Input label="Price" number value={this.state.price} stateKey="price" updateState={this.updateState}/>
                                <Input label="Quantity" number value={this.state.quantity} stateKey="quantity" updateState={this.updateState}/>
                                <Input label="First Stone Earning" number value={this.state.first_stone_earning} stateKey="first_stone_earning" updateState={this.updateState}/>
                                <Input label="Second Stone Earning" number value={this.state.second_stone_earning} stateKey="second_stone_earning" updateState={this.updateState}/>
                                <Input label="Third Stone Earning" number value={this.state.third_stone_earning} stateKey="third_stone_earning" updateState={this.updateState}/>
                                <Input label="Inventory Cost" number value={this.state.inventory_cost} stateKey="inventory_cost" updateState={this.updateState}/>
                                <Input label="Feedback" textarea value={this.state.feedback_message} stateKey="feedback_message" updateState={this.updateState}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary m-r-1" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit} data-dismiss="modal">{text.submit}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ products, theOrder }) {
    return { products, theOrder }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ filterProducts, insertOrderItem, editOrderItemSelect }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderItemModal);