import { ORDERS_FETCH_START, ORDERS_FETCH_SUCCESS } from '../actions/orders';

let initialState = {orders: null, isFetching: null }

export default function (state = initialState, action) {
    let obj = {};
    switch (action.type) {
        case ORDERS_FETCH_SUCCESS:
            obj = {};
            obj.orders = action.orders;
            obj.isFetching = false;
            return obj;
        case ORDERS_FETCH_START:
            obj = {};
            obj.isFetching = null;
            return obj;
        default:
           return state;
    }
 }