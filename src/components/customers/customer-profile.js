import React from 'react';
import { Link } from 'react-router';

import ModalDelete from '../other/modal-delete';

export default function(props) {
    if (!props.data) return null;
    return (
        <div>
            <div className="row">
                <div className="col-md-4 p-b-1">
                    <h2>Customer Profile #{props.data.customer_id}</h2>
                </div>
                <ModalDelete action={props.deleteCustomer} id={props.data.customer_id}/>
                <div className="col-md-6 pull-xs-right">
                    <div className="pull-xs-right">
                            <Link to={'/Customers/' + props.data.customer_id + '/Orders/New'}><button className='btn btn-primary m-r-1' data-toggle="modal" data-target="#orderModal"><i className="fa fa-plus m-r-1"></i>New order</button></Link>
                            <Link to={'/Customers/' + props.data.customer_id + '/Edit'}><button className='btn btn-success m-r-1' data-toggle="modal" data-target="#customerModal"><i className="fa fa-pencil m-r-1"></i>Edit</button></Link>
                            {props.delete ? <button className='btn btn-danger' data-toggle="modal" data-target="#modalDelete"><i className="fa fa-times m-r-1"></i>Delete</button> : <button className='btn btn-danger disabled'><i className="fa fa-times m-r-1"></i>Delete</button>}
                    </div>
                </div>
            </div>   
            <div className="card p-a-1" style={{backgroundColor: '#F2F6F7'}}>  
                <div className="row">
                    <div className="col-md-3">       
                        <div className="p-l-3 m-l-1" style={{fontSize: '9em'}}>
                            <i className="fa fa-user"></i>
                        </div>
                    </div>  
                    <div className="col-md-9">
                        <table className="table table-stripped">
                            <thead className="thead-inverse">
                                <tr>
                                    <th>First name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.data.first_name}</td>
                                    <td>{props.data.last_name}</td>
                                    <td>{props.data.username}</td>
                                    <td>{props.data.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table table-stripped">
                            <thead className="thead-inverse">
                                <tr>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.data.phone_number}</td>
                                    <td>{props.data.address}</td>
                                    <td>{props.data.city}</td>
                                    <td>{props.data.state}</td>
                                    <td>{props.data.country}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12">
                        <table className="table table-stripped">
                            <thead className="thead-inverse">
                                <tr>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.data.notes}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}