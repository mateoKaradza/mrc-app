import { CUSTOMERS_FILTER_SUCCESS } from '../actions/customers';
import _ from 'lodash';

let initialState = {customers: null, err: null, new: false}

export default function (state = initialState, action) {
    let obj = {};
    switch (action.type) {
        case CUSTOMERS_FILTER_SUCCESS:
            obj = _.cloneDeep(state);
            obj.customers = action.customers;
            return obj;
        case 'UPDATE_CUSTOMER_ERROR':
            obj = _.cloneDeep(state);
            obj.err = action.err;
            obj.new = true;
            return obj;
        case 'CUSTOMERS_DISMISS_ERROR':
            obj = _.cloneDeep(state);
            obj.new = false;
            return obj;
        default:
           return state;
    }
 }