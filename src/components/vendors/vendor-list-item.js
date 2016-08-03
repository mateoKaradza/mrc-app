import React from 'react';
import { Link } from 'react-router'

export default function(props) {
    return (
        <tr>
            <td>{props.data.vendor_id}</td>
            <td>{props.data.name}</td>
            <td>{props.data.contact_person}</td>
            <td>{props.data.email}</td>
            <td>{props.data.address}</td>
            <td>
                <Link to={'/Vendors/' + props.data.vendor_id} className='btn btn-secondary btn-sm m-r-1'><i className="fa fa-eye"></i></Link>
            </td>
        </tr>
    )
}