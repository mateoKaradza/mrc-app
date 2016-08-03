import { PRODUCT_FETCH_SUCCESS, PRODUCT_ORDERS_FETCH_SUCCESS, PRODUCT_SUPPLIES_FETCH_SUCCESS } from '../actions/the-product';
import _ from 'lodash';

let initialState = {product: {}, orders: {}, supplies: {} }

export default function (state = initialState, action) {
    let obj = {};
    switch (action.type) {
        case PRODUCT_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.product = action.product;
            return obj;
        case PRODUCT_ORDERS_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.orders = action.orders;
            return obj;
        case PRODUCT_SUPPLIES_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.supplies = action.supplies;
            return obj;
        default:
           return state;
    }
 }