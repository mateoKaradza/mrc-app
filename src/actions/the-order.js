export const ORDER_FETCH_SUCCESS = 'ORDER_FETCH_SUCCESS';
export const ORDER_FETCH_START= 'ORDER_FETCH_START';

export const ORDER_ITEMS_FETCH_SUCCESS = 'ORDER_ITEMS_FETCH_SUCCESS';
export const ORDER_ITEMS_FETCH_START = 'ORDER_ITEMS_FETCH_SUCCESS';

export const ORDER_ITEM_EDIT_START = 'ORDER_ITEM_EDIT_START';
export const ORDER_ITEM_EDIT_END = 'ORDER_ITEM_EDIT_END';

export const ORDER_ITEM_FETCH_SUCCESS = 'ORDER_ITEM_FETCH_SUCCESS';

import { browserHistory } from 'react-router';

import { getOrders } from './the-customer';

function getOrderSuccess(order) {
    return {type: ORDER_FETCH_SUCCESS, order}
}

export function getOrder(id) {
    return dispatch => {
        let url = 'http://localhost:1337/api/orders/' + id;
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json =>
                dispatch(getOrderSuccess(json[0]))
            )
    }
}

function getOrderItemsSuccess(items) {
    return {type: ORDER_ITEMS_FETCH_SUCCESS, items}
}

export function getOrderItems(id) {
    return dispatch => {
        let url = 'http://localhost:1337/api/orders/' + id + '/items';
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json =>
                dispatch(getOrderItemsSuccess(json))
            )
    }
}

export function updateOrder(order) {
    return dispatch => {
        if (order.order_id !== undefined) {
            return fetch('http://localhost:1337/api/orders/' + order.order_id + '/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                    },
                body: JSON.stringify({
                    order
                    })
                })
                .then(response => response.json())
                .then(json => {
                    browserHistory.replace('/Orders/' + order.order_id);
                    dispatch({type: 'UPDATE_ORDER_SUCCESS'})
                    })
        }
        return fetch('http://localhost:1337/api/orders/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
                },
            body: JSON.stringify({
                order
            })
            })
            .then(response => response.json())
            .then(json =>
                dispatch(newOrder(json.insertId))
            )
    }
}

function newOrder(id) {
    browserHistory.replace('/Orders/' + id);
    return {type: ''};
}

export function updateOrderItem(item) {
    return dispatch => {
        if (item.order_details_id !== undefined) {
            return fetch('http://localhost:1337/api/orders/' + item.order_id + '/item/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwtToken')
                    },
                body: JSON.stringify({
                    item
                    })
                })
                .then(response => response.json())
                .then(json => {
                    browserHistory.replace('/Orders/' + item.order_id);
                    dispatch({type: 'UPDATE_ORDER_ITEM_SUCCESS'})
                }
                )
        }
        return fetch('http://localhost:1337/api/orders/' + item.order_id + '/item/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
                },
            body: JSON.stringify({
                item
            })
            })
            .then(response => response.json())
            .then(json => {
                    browserHistory.replace('/Orders/' + item.order_id);
                    dispatch({type: 'ADD_ORDER_ITEM_SUCCESS'})
                }
            )
    }
}

function getOrderItemSuccess(item) {
    return {type: ORDER_ITEM_FETCH_SUCCESS, item}
}

export function getOrderItem(order_details_id, order_id) {
    return dispatch => {
        let url = 'http://localhost:1337/api/orders/' + order_id + '/items/' + order_details_id;
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json =>
                dispatch(getOrderItemSuccess(json[0]))
            )
    }
}

export function deleteOrderItem(item) {
    return dispatch =>
        fetch('http://localhost:1337/api/orders/' + item.order_id + '/item/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
                },
            body: JSON.stringify({
                item
            })
            })
            .then(response => response.json())
            .then(json => {
                    browserHistory.replace('/Orders/' + item.order_id);
                    dispatch({type: 'DELETE_ORDER_ITEM_SUCCESS'});
                    dispatch(getOrderItems(item.order_id));
                }
            )
}

export function deleteOrder(order_id, customer_id) {
    return dispatch =>
        fetch('http://localhost:1337/api/orders/' + order_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
                },
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                browserHistory.replace('/Customers/' + customer_id);
                dispatch({type: 'ORDER_DELETE_SUCCESS'});
                dispatch(getOrders(customer_id))
            }
                
            )
}
