import { PLATFORMS_FETCH_SUCCESS } from '../actions/platforms';

let initialState = []

export default function (state = initialState, action) {
    let array = [];
    switch (action.type) {
        case PLATFORMS_FETCH_SUCCESS:
            array = action.platforms
            return array;
        default:
           return state;
    }
 }