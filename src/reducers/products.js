import { PRODUCTS_FETCH_SUCCESS, LIST_ITEM_COLOR_CHANGE } from '../actions/products';
import _ from 'lodash';

let initialState = {products: null, color: false }

export default function (state = initialState, action) {
    let obj = {};
    switch (action.type) {
        case PRODUCTS_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.products = action.products;
            return obj;
        case LIST_ITEM_COLOR_CHANGE:
            obj = _.cloneDeep(state);
            obj.color = !obj.color;
            return obj;
        default:
           return state;
    }
 }