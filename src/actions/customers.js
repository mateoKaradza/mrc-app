export const CUSTOMERS_FILTER_SUCCESS = 'CUSTOMERS_FILTER_SUCCESS';

function filterSuccess(customers) {
    return {type: CUSTOMERS_FILTER_SUCCESS, customers};
}

export function filterCustomers(filter) {
    return dispatch => {
        let url = 'http://localhost:1337/api/customers/';
        if (filter !== '') {
            url += '?search=' + filter;
        }
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken'),
            }
        })
            .then(response => response.json())
            .then(json =>
                dispatch(filterSuccess(json))
            )
    }
}

export function dismissError() {
    return {type: 'CUSTOMERS_DISMISS_ERROR'}
}