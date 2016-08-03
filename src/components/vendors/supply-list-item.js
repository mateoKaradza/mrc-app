import React from 'react';
import { Link } from 'react-router';

export default function(props) {
    return (
        <tr>
            {props.data.product_name !== undefined ? <td>{props.data.product_name}</td>: null}
            {props.data.vendor_name !== undefined ? <td>{props.data.vendor_name}</td>: null}
            <td>{props.data.date_added}</td>
            <td>{props.data.weight}</td>
            <td>{props.data.quantity}</td>
            <td>$ {props.data.cost}</td>
            <td>{props.data.quality}</td>
            <td>
                {props.data.product_name !== undefined ? <Link to={'/Products/' + props.data.product_id}><span className='btn btn-secondary btn-sm m-r-1'><i className="fa fa-eye"></i></span></Link> : null }
                <Link to={'/Vendors/' + props.data.vendor_id + '/Supplies/' + props.data.unique_id}><span className='btn btn-success btn-sm m-r-1'><i className="fa fa-pencil"></i></span></Link>
                <span className='btn btn-danger btn-sm m-r-1' onClick={() => props.deleteSupply(props.data)}><i className="fa fa-times"></i></span>
            </td>
        </tr>
    )
}