import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getOrder, updateOrder } from '../actions/the-order';
import { getPlatforms } from '../actions/platforms';

import Input from '../components/other/input';
import Select from '../components/other/select';

class OrderEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order_id: this.props.params.order_id,
            customer_id: this.props.params.customer_id, // required
            date: '',
            additional_cost: 0,
            notes: '',
            platform_id: 1
        }

        if (this.props.params.order_id)
            this.props.getOrder(this.props.params.order_id);

        this.props.getPlatforms();

        this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        const order = nextProps.theOrder.order;
        if (order.order_id) 
            this.setState({                 
                customer_id: order.customer_id || null,
                date: order.date || '',
                additional_cost: order.additional_cost,
                notes: order.notes,
                platform_id: order.platform_id
            });
            
    }

    updateState(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = this.state;
        if (data.order_id === null) delete data.order_id;
        this.props.updateOrder(data);
    }

    render() {
        let text = {};
        if (!this.props.theOrder.order.order_id) {
            text = {
                title: 'Create new Order',
                submit: 'Create',       
            }     
        } else {
            text = {    
                title: 'Edit existing Order',
                submit: 'Submit Changes'
            }
        }
        return(
            <div>
                <div className="p-b-1"><h2>{text.title}</h2></div>
                <form onSubmit={this.handleSubmit}>
                    <Select label="Platform" stateKey="platform_id" data={this.props.platforms} updateState={this.updateState} platform_id={this.state.platform_id}/>
                    <Input label="Date" required date value={this.state.date} stateKey="date" updateState={this.updateState}/>
                    <Input label="Additional Cost" number value={this.state.additional_cost} stateKey="additional_cost" updateState={this.updateState}/>
                    <Input label="Notes" textarea value={this.state.notes} stateKey="notes" updateState={this.updateState}/>
                <div className="pull-xs-right form-group p-t-1">
                    <button type="submit" className="btn btn-primary" onSubmit={this.handleSubmit}>{text.submit}</button>
                </div>
                </form>
             </div>     
        )
    }
}

function mapStateToProps({ theOrder, platforms }) {
    return { theOrder, platforms };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getOrder, updateOrder, getPlatforms }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderEdit);