import React from 'react';

import ProductListItem from './product-list-item';

function renderProducts(hideInactive, products, color, addItem, changeStatus) {
    return products.map(product => {
        if (hideInactive && product.status) return null;
        return <ProductListItem product={product} key={product.product_id} disableColor={color} addItem={addItem} changeStatus={changeStatus} hideInactive={hideInactive}/> 
    })
}

export default function(props) {
    return (
        <table className="table table-stripped">
            <thead className="thead-inverse">
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    {props.hideInactive ? null : <th>Selling</th>}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.data.products ? renderProducts(props.hideInactive, props.data.products, props.data.color, props.addItem, props.changeStatus) : null}
            </tbody>
        </table>
    );
}