import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientType: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientType: name
    }
}