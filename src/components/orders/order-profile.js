import React from 'react';
import { Link } from 'react-router';

import ModalDelete from '../other/modal-delete';

export default function (props) {
    if (!props.data.order_id) return null;

    return (
        <div>
            <div className="row">
                <div className="col-md-4 p-b-1">
                    <h2>Order Details #{props.data.order_id} </h2>
                </div>
                <ModalDelete action={props.deleteOrder} id={props.data.order_id} id2={props.data.customer_id}/>
                <div className="col-md-6 pull-xs-right">
                    <div className="pull-xs-right">
                        <Link to={'/Customers/' + props.data.customer_id}><span className='btn btn-secondary m-r-1'><i className="fa fa-eye m-r-1"></i>View customer</span></Link>
                        <Link to={'/Orders/' + props.data.order_id + '/Edit'}><button className='btn btn-success m-r-1' ><i className="fa fa-pencil m-r-1"></i>Edit</button></Link>
                        {props.delete ? <button className='btn btn-danger' data-toggle="modal" data-target="#modalDelete"><i className="fa fa-times m-r-1"></i>Delete</button> : <button className='btn btn-danger disabled'><i className="fa fa-times m-r-1"></i>Delete</button>}
                    </div>
                </div>
            </div>
            <div className="card p-a-1" style={{backgroundColor: '#F2F6F7'}}>  
                <div className="row">
                    <div className="col-md-3">       
                        <div className="p-l-3" style={{fontSize: '9em'}}>
                            <i className="fa fa-shopping-bag"></i>
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
                                    <th>Platform</th>
                                    <th>Additional cost</th>
                                    <th>Date</th>
                                    <th>State</th>
                                    <th>Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.data.platform_name}</td>
                                    <td>$ {props.data.additional_cost}</td>
                                    <td>{props.data.date}</td>
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
                                    <td>{props.data.order_notes}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}