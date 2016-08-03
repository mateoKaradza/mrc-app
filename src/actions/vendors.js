export const VENDORS_FILTER_SUCCESS = 'VENDORS_FILTER_SUCCESS';

function filterSuccess(vendors) {
    return {type: VENDORS_FILTER_SUCCESS, vendors};
}

export function filterVendors(filter) {
    return dispatch => {
        let url = 'http://localhost:1337/api/vendors/';
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
    return {type: 'VENDOR_DISMISS_ERROR'}
}