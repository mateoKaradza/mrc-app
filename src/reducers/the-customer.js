import { CUSTOMER_FETCH_SUCCESS, CUSTOMER_FETCH_START, CUSTOMER_ORDERS_FETCH_START, CUSTOMER_ORDERS_FETCH_SUCCESS, CUSTOMER_ITEMS_FETCH_START, CUSTOMER_ITEMS_FETCH_SUCCESS } from '../actions/the-customer';
import _ from 'lodash';

let initialState = {customer: {}, loaded: false, orders: {}, items: {} }

export default function (state = initialState, action) {
    let obj
    switch (action.type) {
        case CUSTOMER_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.customer = action.customer;
            obj.loaded = true;
            return obj;
        case CUSTOMER_ORDERS_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.orders = action.orders;
            obj.loaded = true;
            return obj;
        case CUSTOMER_ITEMS_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.items = action.items;
            obj.loaded = true;
            return obj;
        case CUSTOMER_ITEMS_FETCH_START:
        case CUSTOMER_ORDERS_FETCH_START:
        case CUSTOMER_FETCH_START:
            obj = _.cloneDeep(state);
            obj.loaded = false;
            return obj;
        default:
           return state;
    }
 }