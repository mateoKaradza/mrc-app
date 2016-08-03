import React from 'react';

import OrderListItem from './order-list-item';

function renderOrders(orders) {
    return orders.map(order => <OrderListItem data={order} key={order.order_id + '' + order.price}/>)
}

export default function(props) {
    if (props.orders[0] === undefined)
        return null;
    return (
        <table className="table table-stripped">
            <thead className="thead-inverse">
                <tr>
                    <th>#</th>
                    <th>Platform name</th>
                    {props.orders[0].price !== undefined ? <th>Product Price</th>: null}
                    {props.orders[0].username !== undefined ? <th>Username</th>: null}
                    {props.orders[0].quantity !== undefined ? <th>Quantity</th>: null}
                    <th>Date</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {renderOrders(props.orders)}
            </tbody>
        </table>
);
}