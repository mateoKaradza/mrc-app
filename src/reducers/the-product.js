import { PRODUCT_FETCH_SUCCESS, PRODUCT_FETCH_START, PRODUCT_ORDERS_FETCH_SUCCESS, PRODUCT_ORDERS_FETCH_START, PRODUCT_SUPPLIES_FETCH_SUCCESS } from '../actions/the-product';
import _ from 'lodash';

let initialState = {product: {}, orders: {}, supplies: {}, isFetching: null }

export default function (state = initialState, action) {
    let obj = {};
    switch (action.type) {
        case PRODUCT_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.product = action.product;
            obj.isFetching = false;
            return obj;
        case PRODUCT_ORDERS_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.orders = action.orders;
            obj.isFetching = false;
            return obj;
        case PRODUCT_SUPPLIES_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.supplies = action.supplies;
            obj.isFetching = false;
            return obj;
        case PRODUCT_ORDERS_FETCH_START:
        case PRODUCT_FETCH_START:
            obj.isFetching = null;
            return obj;
        default:
           return state;
    }
 }