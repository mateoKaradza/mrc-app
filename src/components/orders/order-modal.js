import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateOrder } from '../../actions/the-order';
import { getPlatforms } from '../../actions/platforms';

import Input from '../other/input';
import Select from '../other/select';

class OrderModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer_id: this.props.data.customer_id, // required
            date: this.props.data.date || '',
            additional_cost: this.props.data.additional_cost || 0,
            notes: this.props.data.notes || '',
            platform_id: this.props.data.platform_id || 1
        }

        this.props.getPlatforms();

        this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateState(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit() {
        let data = this.state;
        if (data.order_id === null) {
            delete data.order_id;
        }
        this.props.updateOrder(data);
    }

    render() {
        let text = {};
        if (this.props.type === 'ADD') {
            text = {
                modalTitle: 'Create new Order',
                submit: 'Create',       
            }     
        } else {
            text = {    
                modalTitle: 'Edit existing Order',
                submit: 'Submit Changes'
            }
        }

        if (this.props.platforms.length === 0)
    	    return null;

        return(
            <div className="modal fade" id="orderModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">{text.modalTitle}</h4>
                        </div>
                        <div className="modal-body">
                            <Select label="Platform" stateKey="platform_id" data={this.props.platforms} updateState={this.updateState} platform_id={this.state.platform_id}/>
                            <Input label="Date" date value={this.state.date} stateKey="date" updateState={this.updateState}/>
                            <Input label="Additional Cost" number value={this.state.additional_cost} stateKey="additional_cost" updateState={this.updateState}/>
                            <Input label="Notes" textarea value={this.state.notes} stateKey="notes" updateState={this.updateState}/>
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

function mapStateToProps({ platforms }) {
    return { platforms }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateOrder, getPlatforms }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderModal);