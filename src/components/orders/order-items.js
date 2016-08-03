import React, { Component } from 'react';
import { Link } from 'react-router';

export default class OrderItems extends Component {
    constructor(props) {
        super(props);

        this.renderRows = this.renderRows.bind(this);
    }

    renderRows(data) {
        return data.map(row =>  
                <tr key={row.order_details_id}>
                    <td>{row.product_name}</td>
                    <td>{row.quantity}</td>
                    <td>$ {row.price}</td>
                    <td>{row.feedback_message !== null && row.feedback_message.length > 2 ? <span>Yes</span> : <span>-</span>}</td>
                    <td>$ {row.total}</td>
                    <td>
                        <Link to={'/Products/' + row.product_id}><span className='btn btn-secondary btn-sm m-r-1'><i className="fa fa-eye"></i></span></Link>
                        <Link to={'/Orders/' + row.order_id + '/Items/' + row.order_details_id}><span className='btn btn-success btn-sm m-r-1'><i className="fa fa-pencil"></i></span></Link>
                        <span className='btn btn-danger btn-sm m-r-1' onClick={() => this.props.deleteItem(row)}><i className="fa fa-times"></i></span>
                    </td>
                </tr>
            
        )
    }

    render() {
        return (
            <div>
                <table className="table table-stripped">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Feedback</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows(this.props.items)}
                    </tbody>
                </table>
            </div>
        );
    }
}