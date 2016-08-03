export const PRODUCTS_FETCH_SUCCESS = 'PRODUCTS_FETCH_SUCCESS';
export const PRODUCTS_FETCH_START= 'PRODUCTS_FETCH_START';

export const LIST_ITEM_COLOR_CHANGE = 'LIST_ITEM_COLOR_CHANGE';

function getProductsSuccess(products) {
    return {type: PRODUCTS_FETCH_SUCCESS, products}
}

export function filterProducts(filter) {
    return dispatch => {
        let url = 'http://localhost:1337/api/products/';
        if (filter !== '') {
            url += '?search=' + filter;
        }
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json =>
                dispatch(getProductsSuccess(json))
            )
    }
}

export function changeColor() {
    return {type: LIST_ITEM_COLOR_CHANGE}
}

export function changeStatus(product_id) {
    return dispatch => {
        let url = 'http://localhost:1337/api/products/' + product_id + '/status';
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwtToken')
                },
            body: JSON.stringify({
                product_id
                })
            })
            .then(response => response.json())
            .then(json =>
                dispatch(filterProducts(''))
            )
    }
}