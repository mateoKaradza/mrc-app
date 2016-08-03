import { ORDER_FETCH_SUCCESS, ORDER_ITEMS_FETCH_SUCCESS, ORDER_ITEM_FETCH_SUCCESS } from '../actions/the-order';
import _ from 'lodash';

let initialState = {order: {}, items: {}, item: {}}

export default function (state = initialState, action) {
    let obj = {};
    switch (action.type) {
        case ORDER_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.order = action.order;
            return obj;
        case ORDER_ITEMS_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.items = action.items;
            return obj;
        case ORDER_ITEM_FETCH_SUCCESS:
            console.log(action.item);
            obj = _.cloneDeep(state);
            obj.item = action.item;
            return obj;
        default:
           return state;
    }
 }