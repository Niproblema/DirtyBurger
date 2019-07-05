import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    price: 2.0
}

const PRICES = {
    salad: 0.4,
    cheese: 0.3,
    meat: 1.8,
    bacon: 0.8,
    basePrice: 2.0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
                },
                price: state.price + PRICES[action.ingredientType]
            };

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1
                },
                price: state.price - PRICES[action.ingredientType]
            };

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    ...action.ingredients
                }
            };

        default: return state;
    }
}

export default reducer;