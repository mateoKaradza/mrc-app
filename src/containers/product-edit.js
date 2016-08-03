import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getProduct, updateProduct } from '../actions/the-product';

import Input from '../components/other/input';

class OrderEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product_id: this.props.params.id,
            name: '',
            default_price: 0,
            quantity: 0,
            first_stone_earning: 0,
            second_stone_earning: 0,
            third_stone_earning: 0,
            inventory_cost: 0
        }

        if (this.props.params.id)
            this.props.getProduct(this.props.params.id);

        this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        const product = nextProps.theProduct.product;
        if (product.product_id) 
            this.setState({                 
                name: product.name || '',
                default_price: product.default_price || 0,
                quantity: product.quantity || 0,
                first_stone_earning: product.first_stone_earning || 0,
                second_stone_earning: product.second_stone_earning || 0,
                third_stone_earning: product.third_stone_earning || 0,
                inventory_cost: product.inventory_cost || 0
            });
            
    }

    updateState(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = this.state;
        if (data.product_id === null) delete data.product_id;
        this.props.updateProduct(data);
    }

    render() {
        let text = {};
        if (!this.props.theProduct.product.product_id) {
            text = {
                title: 'Create new Product',
                submit: 'Create',       
            }     
        } else {
            text = {    
                title: 'Edit existing Product',
                submit: 'Submit Changes'
            }
        }
        return(
            <div>
                <div className="p-b-1"><h2>{text.title}</h2></div>
                <form onSubmit={this.handleSubmit}>
                    <Input label="Name" required value={this.state.name} stateKey="name" updateState={this.updateState}/>
                    <Input label="Default Price" required number value={this.state.default_price} stateKey="default_price" updateState={this.updateState}/>
                    <Input label="Quantity" number value={this.state.quantity} stateKey="quantity" updateState={this.updateState}/>
                    <Input label="First Stone Earning" number value={this.state.first_stone_earning} stateKey="first_stone_earning" updateState={this.updateState}/>
                    <Input label="Second Stone Earning" number value={this.state.second_stone_earning} stateKey="second_stone_earning" updateState={this.updateState}/>
                    <Input label="Third Stone Earning" number value={this.state.third_stone_earning} stateKey="third_stone_earning" updateState={this.updateState}/>
                    <Input label="Inventory Cost" number value={this.state.inventory_cost} stateKey="inventory_cost" updateState={this.updateState}/>
                <div className="pull-xs-right form-group p-t-1">
                    <button type="submit" className="btn btn-primary" onSubmit={this.handleSubmit}>{text.submit}</button>
                </div>
                </form>
             </div>     
        )
    }
}

function mapStateToProps({ theProduct }) {
    return { theProduct };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProduct, updateProduct }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderEdit);