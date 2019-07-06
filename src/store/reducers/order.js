import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orderReady: false,
    orders : []
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
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,  
                //Set some flag to true.
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,  
                orders : action.orders
            };
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state, 
                //Set some error flag.
            };


        default: return state;
    }
}

export default reducer;