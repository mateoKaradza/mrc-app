import React from 'react';
import { browserHistory } from 'react-router';

function navigateTo(id) {
    browserHistory.push('/Orders/' + id);
}

function renderRows(data) {
    return data.map(row => {
        return (
            <tr key={row.order_details_id}>
                <td>{row.product_name}</td>
                <td>{row.quantity}</td>
                <td>{row.date}</td>
                <td>
                    <span className='btn btn-secondary btn-sm m-r-1' onClick={() => navigateTo(row.order_id)}><i className="fa fa-eye"></i></span>
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