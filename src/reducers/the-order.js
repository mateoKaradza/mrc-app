import { ORDER_FETCH_START, ORDER_FETCH_SUCCESS, ORDER_ITEMS_FETCH_SUCCESS, ORDER_ITEMS_FETCH_START, ORDER_ITEM_FETCH_SUCCESS } from '../actions/the-order';
import _ from 'lodash';

let initialState = {order: {}, items: {}, item: {}, isFetching: null }

export default function (state = initialState, action) {
    let obj = {};
    switch (action.type) {
        case ORDER_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.order = action.order;
            obj.isFetching = false;
            return obj;
        case ORDER_ITEMS_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.items = action.items;
            obj.isFetching = false;
            return obj;
        case ORDER_ITEM_FETCH_SUCCESS:
            console.log(action.item);
            obj = _.cloneDeep(state);
            obj.item = action.item;
            return obj;
        case ORDER_ITEMS_FETCH_START:
        case ORDER_FETCH_START:
            obj.isFetching = null;
            return obj;
        default:
           return state;
    }
 }