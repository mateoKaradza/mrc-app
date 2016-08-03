import React from 'react';
import { Link } from 'react-router';

import ModalDelete from '../other/modal-delete';

export default function (props) {
    if (!props.data.product_id) return null;
    return (
        <div>
            <div className="row">
                <div className="col-md-6 p-b-1">
                    <h2>Product #{props.data.product_id} </h2>
                </div>
                <ModalDelete action={props.deleteProduct} id={props.data.product_id}/>
                <div className="col-md-4 pull-xs-right">
                    <div className="pull-xs-right">
                        <Link to={'/Products/' + props.data.product_id + '/Edit'}><button className='btn btn-success m-r-1'><i className="fa fa-pencil m-r-1"></i>Edit</button></Link>
                        {props.delete ? <button className='btn btn-danger' data-toggle="modal" data-target="#modalDelete"><i className="fa fa-times m-r-1"></i>Delete</button> : <button className='btn btn-danger disabled'><i className="fa fa-times m-r-1"></i>Delete</button>}
                    </div>
                </div>
            </div>
            <div className="card p-a-1" style={{backgroundColor: '#F2F6F7'}}>  
                <div className="row">
                    <div className="col-md-3">       
                        <div className="p-l-3" style={{fontSize: '9em'}}>
                            <i className="fa fa-leaf"></i>
                        </div>
                    </div>  
                    <div className="col-md-9">
                        <table className="table table-stripped">
                            <thead className="thead-inverse">
                                <tr>
                                    <th>Product name</th>
                                    <th>Default price</th>
                                    <th>Quantity</th>
                                    <th>Inventory Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.data.name}</td>
                                    <td>$ {props.data.default_price}</td>
                                    <td>{props.data.quantity}</td>
                                    <td>$ {props.data.inventory_cost}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table table-stripped">
                            <thead className="thead-inverse">
                                <tr>
                                    <th>First-stone Earning</th>
                                    <th>Second-stone Earning</th>
                                    <th>Third-stone Earning</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>$ {props.data.first_stone_earning}</td>
                                    <td>$ {props.data.second_stone_earning}</td>
                                    <td>$ {props.data.third_stone_earning}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}