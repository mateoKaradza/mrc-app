import { CUSTOMER_FETCH_SUCCESS, CUSTOMER_ORDERS_FETCH_SUCCESS, CUSTOMER_ITEMS_FETCH_SUCCESS } from '../actions/the-customer';
import _ from 'lodash';

let initialState = {customer: {}, orders: {}, items: {} }

export default function (state = initialState, action) {
    let obj
    switch (action.type) {
        case CUSTOMER_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.customer = action.customer;
            return obj;
        case CUSTOMER_ORDERS_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.orders = action.orders;
            return obj;
        case CUSTOMER_ITEMS_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.items = action.items;
            return obj;
        default:
           return state;
    }
 }