import { LOGIN_SUCCESS, LOGOUT_SUCCESS, VERIFY_SUCCESS, LOGIN_ERROR, VERIFY_ERROR } from '../actions/user';
import _ from 'lodash'

let initialState = {user: {}, isAuthenticated: false }

export default function (state = initialState, action) {
    let obj = {};
    switch (action.type) {
        case LOGIN_SUCCESS:
            obj = _.cloneDeep(state);
            obj.user = action.user;
            obj.isAuthenticated = true;
            return obj;
        case LOGOUT_SUCCESS:
            return initialState;
        case VERIFY_SUCCESS:
            obj = _.cloneDeep(state);
            obj.user = action.payload;
            obj.isAuthenticated = true;
            return obj;
        case 'NOT_AUTHED':
            obj.isAuthenticated = false;
            obj.location = action.location;
            obj.redirect = true;
            return obj;
        case 'AUTHED':
            obj = _.cloneDeep(state);
            obj.redirect = false;
            return obj;
        case LOGIN_ERROR:
        case VERIFY_ERROR:
            obj.err = action.err;
            return obj;
        default:
           return state;
    }
 }