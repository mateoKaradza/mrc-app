export const CUSTOMERS_FILTER_SUCCESS = 'CUSTOMERS_FILTER_SUCCESS';
export const CUSTOMERS_FILTER_ERROR= 'CUSTOMERS_FILTER_ERROR';
export const CUSTOMERS_FILTER_START = 'CUSTOMERS_FILTER_START';
export const CUSTOMERS_FILTER_END = 'CUSTOMERS_FILTER_END';

function filterSuccess(customers) {
    return {type: CUSTOMERS_FILTER_SUCCESS, customers};
}

function filterStart() {
    return {type: CUSTOMERS_FILTER_START};
}

export function filterCustomers(filter) {
    return dispatch => {
        dispatch(filterStart());
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