export const PRODUCT_FETCH_SUCCESS = 'PRODUCT_FETCH_SUCCESS';
export const PRODUCT_ORDERS_FETCH_SUCCESS = 'PRODUCT_ORDERS_FETCH_SUCCESS';
export const PRODUCT_SUPPLIES_FETCH_SUCCESS = 'PRODUCT_SUPPLIES_FETCH_SUCCESS';

import { browserHistory } from 'react-router';

import { filterProducts } from './products';

function getProductSuccess(product) {
    return {type: PRODUCT_FETCH_SUCCESS, product}
}

export function getProduct(id) {
    return dispatch => {
        let url = 'http://localhost:1337/api/products/' + id;
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json =>
                dispatch(getProductSuccess(json[0]))
            )
    }
}

function getProductOrdersSuccess(orders) {
    return {type: PRODUCT_ORDERS_FETCH_SUCCESS, orders}
}

export function getProductOrders(id) {
    return dispatch => {
        let url = 'http://localhost:1337/api/products/' + id + '/orders';
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json =>
                dispatch(getProductOrdersSuccess(json))
            )
    }
}

function getProductSuppliesSuccess(supplies) {
    return {type: PRODUCT_SUPPLIES_FETCH_SUCCESS, supplies}
}

export function getProductSupplies(id) {
    return dispatch => {
        let url = 'http://localhost:1337/api/products/' + id + '/supplies';
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json =>
                dispatch(getProductSuppliesSuccess(json))
            )
    }
}

export function updateProduct(product) {
    return dispatch => {
        if (product.product_id !== undefined) {
            return fetch('http://localhost:1337/api/products/' + product.product_id + '/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                    },
                body: JSON.stringify({
                    product
                    })
                })
                .then(response => response.json())
                .then(json => {
                    browserHistory.replace('/Products/' + product.product_id);
                    dispatch({type: 'PRODUCT_UPDATE_SUCCESS'});
                });
        }
        return fetch('http://localhost:1337/api/products/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
                },
            body: JSON.stringify({
                product
            })
            })
            .then(response => response.json())
            .then(json =>
                dispatch(newProduct(json.insertId))
            )
    }
}

function newProduct(id) {
    browserHistory.replace('/Products/' + id);
    return {type: 'NEW_PRODUCT_SUCCESS'};
}

export function deleteProduct(product_id) {
    return dispatch =>
        fetch('http://localhost:1337/api/products/' + product_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
                },
            })
            .then(response => response.json())
            .then(json => {
                browserHistory.replace('/Products/');
                dispatch({type: 'PRODUCT_DELETE_SUCCESS'});
                dispatch(filterProducts(''));
            })
}
