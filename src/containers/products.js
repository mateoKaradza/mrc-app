import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { filterProducts, changeColor, changeStatus } from '../actions/products';

import Search from '../components/other/search';
import ProductList from '../components/products/product-list';
import ProductModal from '../components/products/product-modal';

class Products extends Component {
    constructor(props) {
        super(props);
        
        this.props.filterProducts('');
    }
    render() {
        return(
            <div>
                <div><h2>Products</h2></div>
                <ProductModal data={{}} type='ADD'/>
                <div className="row m-y-1">
                    <div className="col-md-7">
                        <Search action={this.props.filterProducts}/>
                    </div>
                    <div className="col-md-4 pull-xs-right">
                        <div className="pull-xs-right">
                            <Link to='/Products/New'><span className='btn btn-primary m-r-1'><i className="fa fa-plus m-r-1"></i>New product</span></Link>
                            {this.props.products.color ? 
                                <span className='btn btn-success' onClick={() => this.props.changeColor()}><i className="fa fa-paint-brush"></i></span> :
                                <span className='btn btn-danger' onClick={() => this.props.changeColor()}><i className="fa fa-paint-brush"></i></span>
                            }
                        </div>
                    </div>
                </div>
                <ProductList data={this.props.products} changeStatus={this.props.changeStatus}/>
            </div>
        )
    }
}

function mapStateToProps({ products }) {
    return { products };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ filterProducts, changeColor, changeStatus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)