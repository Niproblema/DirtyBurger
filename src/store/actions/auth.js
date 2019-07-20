import * as actionTypes from './actionTypes';
//import axios from '../../axios-link';
import firebaseConfig from '../../private/firebaseConfig';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    }

}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        let url = isSignup ?
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + firebaseConfig.apiKey
            : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + firebaseConfig.apiKey;
        axios.post(url,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .then(response => {
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000));
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));    //TODO: remember to cancel timer
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error));
            });
    }
}

export const authRenewState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expirationDate');
        const userId = localStorage.getItem('userId');
        if (!token || !expirationDate || !userId || (new Date(expirationDate) < new Date())) {
            dispatch(authLogout());
        } else {
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout(Math.floor(new Date(expirationDate).getTime() - new Date().getTime()) / 1000));
        }
    }
}