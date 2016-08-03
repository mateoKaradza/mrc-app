import { ORDERS_FETCH_SUCCESS } from '../actions/orders';

let initialState = {orders: null }

export default function (state = initialState, action) {
    let obj = {};
    switch (action.type) {
        case ORDERS_FETCH_SUCCESS:
            obj = {};
            obj.orders = action.orders;
            return obj;
        default:
           return state;
    }
 }