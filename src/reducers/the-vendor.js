import { VENDOR_FETCH_SUCCESS, VENDOR_SUPPLIES_FETCH_SUCCESS, VENDOR_SUPPLY_FETCH_SUCCESS } from '../actions/the-vendor';
import _ from 'lodash';

let initialState = {vendor: {}, supplies: {}, supply: {}}

export default function (state = initialState, action) {
    let obj;
    switch (action.type) {
        case VENDOR_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.vendor = action.vendor;
            return obj;
        case VENDOR_SUPPLIES_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.supplies = action.supplies;
            return obj;
        case VENDOR_SUPPLY_FETCH_SUCCESS:
            obj = _.cloneDeep(state);
            obj.supply = action.supply;
            return obj;
        default:
           return state;
    }
 }