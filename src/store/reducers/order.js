import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orderReady: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,   //Just in case I add some more fields.
                orderReady: true
            };
        case actionTypes.PURCHASE_FIN:
            return {
                ...state,   //Just in case I add some more fields.
                orderReady: false
            };

        default: return state;
    }
}

export default reducer;