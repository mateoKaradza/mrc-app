export const ORDERS_FETCH_SUCCESS = 'ORDERS_FETCH_SUCCESS';
export const ORDERS_FETCH_START= 'ORDERS_FETCH_START';

function getOrdersSuccess(orders) {
    return {type: ORDERS_FETCH_SUCCESS, orders}
}

export function getOrders() {
    return dispatch => {
        let url = 'http://localhost:1337/api/orders/';
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