import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                error: null,
                loading: false,
                token: action.idToken,
                userId: action.userId
            };
        case actionTypes.AUTH_FAILED:
            return {
                error: action.error,
                loading: false,
                token: null,
                userId: null
            };
        case actionTypes.AUTH_LOGOUT:
            return initialState

        default: return state;
    }
}

export default reducer;