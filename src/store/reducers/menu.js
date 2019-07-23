import * as actionTypes from '../actions/actionTypes';

export const initialState = {
    menuDate: null,         //Menu creation/update dat, time(ms) since Unix Epoch, timezone independant.
    categories: null,
    items: null,
    fetching: false,        //Loading menu
    fetchError: null,
    menuFetchDate: null,    //Date when data was fetched-null=never,otherwise time(ms) since Unix Epoch, timezone independant.


    pushing: false,         //Pushing/Patching menu to server
    pushError: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Fetches//
        case actionTypes.MENU_FETCH_START:
            return {
                ...state,
                fetching: true,
                fetchError: null
            };
        case actionTypes.MENU_FETCH_SUCCESS:
            return {
                menuDate : action.menuDate,
                categories : action.categories,
                items : action.items,
                fetching : false,
                fetchError : null,
                menuFetchDate: action.fetchDate,
                pushing: state.pushing,
                pushError: state.pushError
            };
        case actionTypes.MENU_FETCH_FAILED:
            return {
                ...state,
                fetchError : action.fetchError
            };

        //Pushes//
        case actionTypes.MENU_PUSH_START:
            return {
                ...state,
                pushing : true,
                pushError : null
            };
        case actionTypes.MENU_PUSH_SUCCESS:
            return {
                ...state,
                pushing : false,
                pushError : null
            };
        case actionTypes.MENU_PUSH_FAILED:
            return {
                ...state,
                pushing : false,
                pushError : action.pushError
            };

        //Patches
        case actionTypes.MENU_PATCH_START:
            return {
                ...state,
                pushing : true,
                pushError : null
            };
        case actionTypes.MENU_PATCH_SUCCESS:
            return {
                ...state,
                pushing : false,
                pushError : null
            };
        case actionTypes.MENU_PATCH_FAILED:
            return {
                ...state,
                pushing : false,
                pushError : action.pushError
            };

        default: return state;
    }
}

export default reducer;