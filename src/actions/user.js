export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';
export const VERIFY_ERROR = 'VERIFY_ERROR';

function verifySuccess(payload) {
    return {type: VERIFY_SUCCESS, payload}
}

function verifyError(err) {
    return {type: VERIFY_ERROR, err}
}

export function login(username, password) {
    return dispatch => {
        fetch('http://localhost:1337/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(response => response.json())
        .then(json => {
            if (!json.err) {
                localStorage.setItem('jwtToken', json.token);
                dispatch({type: LOGIN_SUCCESS, user: json})
            } else {
                dispatch({type: LOGIN_ERROR, error: json.err})
            }
        });
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        dispatch({type: LOGOUT_SUCCESS});
    }
}

export function verify() {
    return dispatch => {
        return fetch('http://localhost:1337/api/users/verify', {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('jwtToken'),
            }
        })
            .then(response => response.json())
            .then(json => {
                if (!json.err) {
                    dispatch(verifySuccess(json));
                } else
                    dispatch(verifyError(json.err));
            })
    }
}

export function redirecting() {
    return {type: 'AUTHED'};
}