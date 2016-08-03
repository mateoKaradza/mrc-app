import React from 'react';
import { Link } from 'react-router';

function renderRows(data) {
    return data.map(row => {
        return (
            <tr key={row.order_details_id}>
                <td>{row.product_name}</td>
                <td>{row.quantity}</td>
                <td>{row.date}</td>
                <td>
                    <Link to={'Orders/' + row.order_id}><span className='btn btn-secondary btn-sm m-r-1'><i className="fa fa-eye"></i></span></Link>
                </td>
            </tr>
        )
    })
}

export default function(props) {
    return (
        <div>
            <table className="table table-stripped">
                <thead className="thead-inverse">
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows(props.items)}
                </tbody>
            </table>
        </div>
    );
}