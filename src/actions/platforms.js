export const PLATFORMS_FETCH_SUCCESS = 'PLATFORMS_FETCH_SUCCESS';

export function getPlatforms() {
    return dispatch => {
        return fetch('http://localhost:1337/api/orders/platforms/', {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken')
                }
            })
            .then(response => response.json())
            .then(json => 
                dispatch({type: PLATFORMS_FETCH_SUCCESS, platforms: json})   
            )
    }
}