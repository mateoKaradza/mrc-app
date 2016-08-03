import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getSupply, updateSupply } from '../actions/the-vendor';
import { filterProducts } from '../actions/products';

import Input from '../components/other/input';
import Search from '../components/other/search';
import ProductList from '../components/products/product-list';

class SupplyEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product_name: '',
            unique_id: this.props.params.unique_id || null, // key
            vendor_id: this.props.params.vendor_id, // required
            product_id: null, 
            date_added: '',
            weight: '',
            cost: 0,
            quantity: 0,
            quality: '',
            notes: ''
        }

        if (this.props.params.unique_id)
            this.props.getSupply(this.props.params.unique_id, this.props.params.vendor_id);

        this.updateState = this.updateState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderSearch = this.renderSearch.bind(this);
        this.populate = this.populate.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        const supply = nextProps.theVendor.supply;
        if (supply.unique_id) 
            this.setState({   
                unique_id: supply.unique_id,
                product_name: supply.product_name,             
                product_id: supply.product_id, 
                vendor_id: supply.vendor_id,
                date_added: supply.date_added || '',
                weight: supply.weight || '',
                cost: supply.cost || 0,
                quantity: supply.quantity || 0,
                quality: supply.quality || '',
                notes: supply.notes || ''
            });
            
    }

    updateState(key, value) {
        this.setState({[key]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = this.state;
        if (data.unique_id === null) delete data.unique_id;
        delete data.product_name;
        this.props.updateSupply(data);
    }

    populate(item) {
        this.setState({
            product_name: item.name,
            product_id: item.product_id
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
                <ProductList data={this.props.products} hideInactive={true} addItem={this.populate} />
            </div>
        )
    }

    render() {
        let text = {};
        if (!this.props.theVendor.supply.unique_id) 
            text = { title: 'Create new Supply', submit: 'Create' }     
        else 
            text = { title: 'Edit existing Supply', submit: 'Submit Changes' }
        
        return(
            <div>
                <div className="p-b-1"><h2>{text.title}</h2></div>
                {this.state.unique_id === null ? this.renderSearch() : null}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <Input label="Product Name" readonly required value={this.state.product_name}/>
                        <Input label="Date" required date value={this.state.date_added} stateKey="date_added" updateState={this.updateState}/>
                        <Input label="Weight" value={this.state.weight} stateKey="weight" updateState={this.updateState}/>
                        <Input label="Cost" value={this.state.cost} stateKey="cost" updateState={this.updateState}/>
                        <Input label="Quantity" number value={this.state.quantity} stateKey="quantity" updateState={this.updateState}/>
                        <Input label="Quality" value={this.state.quality} stateKey="quality" updateState={this.updateState}/>
                        <Input label="Notes" textarea value={this.state.notes} stateKey="notes" updateState={this.updateState}/>
                    </div>
                <div className="pull-xs-right form-group p-t-1">
                    <button type="submit" className="btn btn-primary" onSubmit={this.handleSubmit}>{text.submit}</button>
                </div>
                </form>
             </div>     
        )
    }
}

function mapStateToProps({ products, theVendor }) {
    return { products, theVendor };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getSupply, updateSupply, filterProducts }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SupplyEdit);