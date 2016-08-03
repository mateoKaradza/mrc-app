import { VENDORS_FILTER_SUCCESS } from '../actions/vendors';
import _ from 'lodash';

let initialState = {vendors: null, err: null, new: false}

export default function (state = initialState, action) {
    let obj = {};
    switch (action.type) {
        case VENDORS_FILTER_SUCCESS:
            obj = _.cloneDeep(state);
            obj.vendors = action.vendors;
            return obj;
        case 'UPDATE_VENDOR_ERROR':
            obj = _.cloneDeep(state);
            obj.err = action.err;
            obj.new = true;
            return obj;
        case 'VENDOR_DISMISS_ERROR':
            obj = _.cloneDeep(state);
            obj.new = false;
            return obj;
        default:
           return state;
    }
 }