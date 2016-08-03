export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export function updateProfile(profile) {
    return {type: UPDATE_PROFILE, profile}
}

export function authenticate() {   
    return {type: AUTHENTICATE_SUCCESS}
}

export function logout() {
    return {type: LOGOUT_SUCCESS}
}