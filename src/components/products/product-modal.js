import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateProduct } from '../../actions/the-product';

import Input from '../other/input';

class OrderModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product_id: this.props.data.product_id || null,
            name: this.props.data.name || '',
            default_price: this.props.data.default_price || 0,
            quantity: this.props.data.quantity || 0,
            first_stone_earning: this.props.data.first_stone_earning || 0,
            second_stone_earning: this.props.data.second_stone_earning || 0,
            third_stone_earning: this.props.data.third_stone_earning || 0,
            inventory_cost: this.props.data.inventory_cost || 0
        }

        this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateState(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit() {
        let data = this.state;
        if (data.product_id === null) {
            delete data.product_id;
        }
        this.props.updateProduct(data);
    }

    render() {
        let text = {};
        if (this.props.type === 'ADD') {
            text = {
                modalTitle: 'Create new Product',
                submit: 'Create',       
            }     
        } else {
            text = {    
                modalTitle: 'Edit existing Product',
                submit: 'Submit Changes'
            }
        }

        return(
            <div className="modal fade" id="productModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">{text.modalTitle}</h4>
                        </div>
                        <div className="modal-body">
                            <Input label="Name" value={this.state.name} stateKey="name" updateState={this.updateState}/>
                            <Input label="Default Price" number value={this.state.default_price} stateKey="default_price" updateState={this.updateState}/>
                            <Input label="Quantity" number value={this.state.quantity} stateKey="quantity" updateState={this.updateState}/>
                            <Input label="First Stone Earning" number value={this.state.first_stone_earning} stateKey="first_stone_earning" updateState={this.updateState}/>
                            <Input label="Second Stone Earning" number value={this.state.second_stone_earning} stateKey="second_stone_earning" updateState={this.updateState}/>
                            <Input label="Third Stone Earning" number value={this.state.third_stone_earning} stateKey="third_stone_earning" updateState={this.updateState}/>
                            <Input label="Inventory Cost" number value={this.state.inventory_cost} stateKey="inventory_cost" updateState={this.updateState}/>
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateProduct }, dispatch);
}


export default connect(null, mapDispatchToProps)(OrderModal);