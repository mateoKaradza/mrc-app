import React from 'react';

import SupplyListItem from './supply-list-item';

function renderSupplies(supplies, deleteSupply) {
    return supplies.map(supply => <SupplyListItem data={supply} key={supply.unique_id} deleteSupply={deleteSupply}/>)
}

export default function(props) {
    return (
        <table className="table table-stripped">
            <thead className="thead-inverse">
                <tr>
                    {props.supplies[0].product_name !== undefined ? <th>Product</th>: null}
                    {props.supplies[0].vendor_name !== undefined ? <th>Vendor</th>: null}
                    <th>Date</th>
                    <th>Weight</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                    <th>Quality</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {renderSupplies(props.supplies, props.deleteSupply)}
            </tbody>
        </table>
    );
}