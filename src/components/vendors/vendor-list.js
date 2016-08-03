import React from 'react';

import VendorListItem from './vendor-list-item'

function mapVendors(data) {
    return data.vendors.map(vendor =>  <VendorListItem data={vendor} key={vendor.vendor_id}/>)
}
export default function(props){
    return(
            <div>
                <table className='table table-hover'>
                    <thead className='thead-inverse'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.vendors ? mapVendors(props.data) : null}
                    </tbody>
                </table>
            </div>
        )
}