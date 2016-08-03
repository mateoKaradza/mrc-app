import React from 'react';
import { Link } from 'react-router';

export default function(props) {
    return (
        <tr>
            <td>{props.data.order_id}</td>
            <td>{props.data.name}</td>
            {props.data.price !== undefined ? <td>$ {props.data.price}</td>: null}
            {props.data.username ? <td>{props.data.username}</td>: null}
            {props.data.quantity ? <td>{props.data.quantity}</td>: null}
            <td>{props.data.date}</td>
            <td>$ {props.data.total}</td>
            <td>
                <Link to={'/Orders/' + props.data.order_id}><span className='btn btn-secondary btn-sm m-r-1'><i className="fa fa-eye"></i></span></Link>
            </td>
        </tr>
    )
}