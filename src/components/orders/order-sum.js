import React from 'react';

import { calculateOrder } from '../../utils/order.js'

export default function(props) {
    let result = calculateOrder(props.items) || {total: 0, grossTotal: 0, inventoryCost: 0, quantity: 0};

    return (
        <div>
            <div className="p-b-1"><h2>Stats</h2></div>
            <div className="row">
                <div className="col-md-3">
                    <div className="alert alert-success">
                        <span><strong>Total:</strong> $ {result.total}</span>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="alert alert-success">
                        <span><strong>Grand Total:</strong> $ {(Number(result.total) + Number(props.additionalCost)).toFixed(2)}</span>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="alert alert-success">
                        <span><strong>Gross Profit:</strong> $ {result.grossTotal}</span>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="alert alert-success">
                        <span><strong>Inventory Cost:</strong> $ {result.inventoryCost}</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="alert alert-success">
                        <span><strong>Products Bought:</strong> {result.quantity}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}