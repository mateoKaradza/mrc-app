import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getOrderItem, updateOrderItem } from '../actions/the-order';
import { filterProducts } from '../actions/products';

import Input from '../components/other/input';
import Search from '../components/other/search';
import ProductList from '../components/products/product-list';

class OrderEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product_name: '',
            order_details_id: this.props.params.order_details_id || null, // key
            order_id: this.props.params.order_id, // required
            product_id: null, 
            price: 0,
            quantity: 0,
            first_stone_earning: 0,
            second_stone_earning: 0,
            third_stone_earning: 0,
            inventory_cost: 0,
            feedback_message: ''
        }

        if (this.props.params.order_details_id)
            this.props.getOrderItem(this.props.params.order_details_id, this.props.params.order_id);

        this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderSearch = this.renderSearch.bind(this);
        this.populate = this.populate.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        const item = nextProps.theOrder.item;
        if (item.order_details_id) 
            this.setState({   
                product_name: item.product_name,             
                order_id: item.order_id,
                product_id: item.product_id, 
                price: item.price || 0,
                quantity: item.quantity || 0,
                first_stone_earning: item.first_stone_earning || 0,
                second_stone_earning: item.second_stone_earning || 0,
                third_stone_earning: item.third_stone_earning || 0,
                inventory_cost: item.inventory_cost || 0,
                feedback_message: item.feedback_message || ''
            });
            
    }

    updateState(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = this.state;
        if (data.order_details_id === null) delete data.order_details_id;
        delete data.product_name;
        this.props.updateOrderItem(data);
    }

    populate(item) {
        this.setState({
            product_name: item.name,
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
                </div>
                <ProductList data={this.props.products} hideInactive={true} selectedItem={this.props.theOrder.item} addItem={this.populate} />
            </div>
        )
    }

    render() {
        let text = {};
        if (!this.props.theOrder.item.order_details_id) 
            text = { title: 'Create new Order Item', submit: 'Create' }     
        else 
            text = { title: 'Edit existing Order Item', submit: 'Submit Changes' }
        
        return(
            <div>
                <div className="p-b-1"><h2>{text.title}</h2></div>
                {this.state.order_details_id === null ? this.renderSearch() : null}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <Input label="Product Name" readonly required value={this.state.product_name}/>
                        <Input label="Price" number value={this.state.price} stateKey="price" updateState={this.updateState}/>
                        <Input label="Quantity" number value={this.state.quantity} stateKey="quantity" updateState={this.updateState}/>
                        <Input label="First Stone Earning" number value={this.state.first_stone_earning} stateKey="first_stone_earning" updateState={this.updateState}/>
                        <Input label="Second Stone Earning" number value={this.state.second_stone_earning} stateKey="second_stone_earning" updateState={this.updateState}/>
                        <Input label="Third Stone Earning" number value={this.state.third_stone_earning} stateKey="third_stone_earning" updateState={this.updateState}/>
                        <Input label="Inventory Cost" number value={this.state.inventory_cost} stateKey="inventory_cost" updateState={this.updateState}/>
                        <Input label="Feedback" textarea value={this.state.feedback_message} stateKey="feedback_message" updateState={this.updateState}/>
                    </div>
                <div className="pull-xs-right form-group p-t-1">
                    <button type="submit" className="btn btn-primary" onSubmit={this.handleSubmit}>{text.submit}</button>
                </div>
                </form>
             </div>     
        )
    }
}

function mapStateToProps({ products, theOrder }) {
    return { products, theOrder };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getOrderItem, updateOrderItem, filterProducts }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderEdit);