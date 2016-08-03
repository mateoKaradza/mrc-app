import React from 'react';
import { Link } from 'react-router'

export default function(props) {
    return (
        <tr>
            <td>{props.data.customer_id}</td>
            <td>{props.data.first_name}</td>
            <td>{props.data.last_name}</td>
            <td>{props.data.username}</td>
            <td>{props.data.email}</td>
            <td>
                <Link to={'/Customers/' + props.data.customer_id} className='btn btn-secondary btn-sm m-r-1'><i className="fa fa-eye"></i></Link>
            </td>
        </tr>
    )
}