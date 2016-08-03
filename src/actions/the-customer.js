export const CUSTOMER_FETCH_SUCCESS = 'CUSTOMER_FETCH_SUCCESS';
export const CUSTOMER_ORDERS_FETCH_SUCCESS = 'CUSTOMER_ORDERS_FETCH_SUCCESS';
export const CUSTOMER_ITEMS_FETCH_SUCCESS = 'CUSTOMER_ITEMS_FETCH_SUCCESS';

import { browserHistory } from 'react-router';

import { filterCustomers } from './customers';

function getCustomerSuccess(customer) {
    return {type: CUSTOMER_FETCH_SUCCESS, customer};
}

function customerUpdateSuccess() {
    return {type: 'CUSTOMER_UPDATE_SUCCESS'};
}

export function getCustomer(id) {
    return dispatch => {
        let url = 'http://localhost:1337/api/customers/' + id;
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json =>
                dispatch(getCustomerSuccess(json[0]))
            )

    }
}

function getOrdersSuccess(orders) {
    return {type: CUSTOMER_ORDERS_FETCH_SUCCESS, orders}
}

export function getOrders(id) {
    return dispatch => {
        let url = 'http://localhost:1337/api/customers/' + id + '/orders';
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json =>
                dispatch(getOrdersSuccess(json))
            )
    }
}

function getPurchasedItemsSuccess(items) {
    return {type: CUSTOMER_ITEMS_FETCH_SUCCESS, items}
}

export function getPurchasedItems(id) {
    return dispatch => {
        let url = 'http://localhost:1337/api/customers/' + id + '/items';
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json =>
                dispatch(getPurchasedItemsSuccess(json))
            )
    }
}

export function updateCustomer(customer) {
    return dispatch => {
        if (customer.customer_id !== undefined) {
            return fetch('http://localhost:1337/api/customers/' + customer.customer_id + '/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                    },
                body: JSON.stringify({
                    customer
                    })
                })
                .then(response => response.json())
                .then(json =>
                {   
                    if (json.code === "ER_DUP_ENTRY") {
                        browserHistory.replace('/Customers/');
                        dispatch({type: 'UPDATE_CUSTOMER_ERROR', err: 'Customer with that username or email already exists'});
                    } else {
                        browserHistory.replace('/Customers/' + customer.customer_id);
                        dispatch(customerUpdateSuccess());
                    }                   
                }
                    
                )
        } else {
            return fetch('http://localhost:1337/api/customers/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                    },
                body: JSON.stringify({
                    customer
                })
                })
                .then(response => response.json())
                .then(json => {
                    if (json.code === "ER_DUP_ENTRY") {
                        browserHistory.replace('/Customers/');
                        dispatch({type: 'UPDATE_CUSTOMER_ERROR', err: 'Customer with that username or email already exists'});
                    } else 
                        dispatch(newCustomer(json.insertId))
                }
                    
                )
        }
    }
}

function newCustomer(id) {
    browserHistory.push('/Customers/' + id);
    return {type: 'NEW_CUSTOMER_SUCCESS'};
}

export function deleteCustomer(customer_id) {
    return dispatch =>
        fetch('http://localhost:1337/api/customers/' + customer_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
                },
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                browserHistory.replace('/Customers/');
                dispatch({type: 'CUSTOMER_DELETE_SUCCESS'});
                dispatch(filterCustomers(''))
            })
}