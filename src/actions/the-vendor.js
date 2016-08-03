export const VENDOR_FETCH_SUCCESS = 'VENDOR_FETCH_SUCCESS';
export const VENDOR_SUPPLIES_FETCH_SUCCESS = 'VENDOR_SUPPLIES_FETCH_SUCCESS';
export const VENDOR_SUPPLY_FETCH_SUCCESS = 'VENDOR_SUPPLY_FETCH_SUCCESS';

import { browserHistory } from 'react-router';

import { filterVendors } from './vendors';

function getVendorSuccess(vendor) {
    return {type: VENDOR_FETCH_SUCCESS, vendor};
}

function vendorUpdateSuccess() {
    return {type: 'VENDOR_UPDATE_SUCCESS'};
}

export function getVendor(id) {
    return dispatch => {
        let url = 'http://localhost:1337/api/vendors/' + id;
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json =>
                dispatch(getVendorSuccess(json[0]))
            )
    }
}

function getSuppliesSuccess(supplies) {
    return {type: VENDOR_SUPPLIES_FETCH_SUCCESS, supplies}
}

export function getSupplies(id) {
    return dispatch => {
        let url = 'http://localhost:1337/api/vendors/' + id + '/supplies';
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json =>
                dispatch(getSuppliesSuccess(json))
            )
    }
}

function getSupplySuccess(supply) {
    return {type: VENDOR_SUPPLY_FETCH_SUCCESS, supply}
}

export function getSupply(unique_id, vendor_id) {
    return dispatch => {
        let url = 'http://localhost:1337/api/vendors/' + vendor_id + '/supplies/' + unique_id;
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json =>
                dispatch(getSupplySuccess(json[0]))
            )
    }
}

export function updateVendor(vendor) {
    return dispatch => {
        if (vendor.vendor_id !== undefined) {
            return fetch('http://localhost:1337/api/vendors/' + vendor.vendor_id + '/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                    },
                body: JSON.stringify({
                    vendor
                    })
                })
                .then(response => response.json())
                .then(json => {   
                    if (json.code === "ER_DUP_ENTRY") {
                        browserHistory.replace('/Vendors/');
                        dispatch({type: 'UPDATE_VENDOR_ERROR', err: 'Vendor with that name or email already exists'});
                    } else {
                        browserHistory.replace('/Vendors/' + vendor.vendor_id);
                        dispatch(vendorUpdateSuccess());
                    }                   
                })
        } else {
            // add
            return fetch('http://localhost:1337/api/vendors/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                    },
                body: JSON.stringify({
                    vendor
                })
                })
                .then(response => response.json())
                .then(json => {
                    if (json.code === "ER_DUP_ENTRY") {
                        browserHistory.replace('/Vendors/');
                        dispatch({type: 'UPDATE_VENDOR_ERROR', err: 'Vendor with that username or email already exists'});
                    } else 
                        dispatch(newVendor(json.insertId))
                })
        }
    }
}

function newVendor(id) {
    browserHistory.push('/Vendors/' + id);
    return {type: 'NEW_VENDOR_SUCCESS'};
}

export function deleteVendor(vendor_id) {
    return dispatch =>
        fetch('http://localhost:1337/api/vendors/' + vendor_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
                },
            })
            .then(response => response.json())
            .then(json => {
                browserHistory.replace('/Vendors/');
                dispatch({type: 'VENDOR_DELETE_SUCCESS'});
                dispatch(filterVendors(''))
            })
}

export function updateSupply(supply) {
    return dispatch => {
        if (supply.unique_id !== undefined) {
            return fetch('http://localhost:1337/api/vendors/' + supply.vendor_id + '/supplies/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                    },
                body: JSON.stringify({
                    supply
                    })
                })
                .then(response => response.json())
                .then(json => {
                    browserHistory.replace('/Vendors/' + supply.vendor_id);
                    dispatch({type: 'UPDATE_SUPPLY_SUCCESS'})
                }
                )
        }
        return fetch('http://localhost:1337/api/vendors/' + supply.vendor_id + '/supplies/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
                },
            body: JSON.stringify({
                supply
            })
            })
            .then(response => response.json())
            .then(json => {
                    browserHistory.replace('/Vendors/' + supply.vendor_id);
                    dispatch({type: 'ADD_SUPPLY_SUCCESS'})
                }
            )
    }
}

export function deleteSupply(supply) {
    return dispatch =>
        fetch('http://localhost:1337/api/vendors/' + supply.vendor_id + '/supplies/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
                },
            body: JSON.stringify({
                supply
            })
            })
            .then(response => response.json())
            .then(json => {
                    browserHistory.replace('/Vendors/' + supply.vendor_id);
                    dispatch({type: 'DELETE_SUPPLY_SUCCESS'});
                    dispatch(getVendor(supply.vendor_id));
                    dispatch(getSupplies(supply.vendor_id));
                }
            )
}