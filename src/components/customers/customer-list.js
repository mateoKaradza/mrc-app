import React from 'react';

import CustomerListItem from './customer-list-item'

function mapCustomers(data) {
    return data.customers.map(customer => <CustomerListItem data={customer} key={customer.customer_id}/>)
}
export default function(props){
    return(
            <div>
                <table className='table'>
                    <thead className='thead-inverse'>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.customers ? mapCustomers(props.data) : null}
                    </tbody>
                </table>
            </div>
        )
}