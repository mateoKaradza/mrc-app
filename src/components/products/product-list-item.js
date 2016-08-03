import React from 'react';

import { Link } from 'react-router';

export default function(props) {
    let layout;
    const quantity = props.product.quantity;

    if (quantity > 59)
        layout = 'table-success';
    else if (quantity > 29)
        layout = 'table-info';
    else if (quantity > 10)
        layout = 'table-warning'
    else if (quantity > 0)
        layout = 'table-danger'

    if (!props.disableColor)
        layout = '';

    return (
        <tr className={layout}>
            <td>{props.product.product_id}</td>
            <td>{props.product.name}</td>
            <td>{props.product.default_price}</td>
            <td>{props.product.quantity}</td>
            {!props.hideInactive ? <td><span onClick={() => props.changeStatus(props.product.product_id)}>{props.product.status !== 0 ? <button className="btn btn-danger btn-sm">Inactive</button> : <button className="btn btn-success btn-sm">Active</button>}</span></td> : null}
            <td>
                {props.addItem ? 
                    <button className='btn btn-primary btn-sm m-r-1' onClick={() => props.addItem(props.product)}><i className="fa fa-plus"></i></button>: 
                    <Link to={'/Products/' + props.product.product_id}><button className='btn btn-secondary btn-sm m-r-1'><i className="fa fa-eye"></i></button></Link>
                }
            </td>
        </tr>
    );
}