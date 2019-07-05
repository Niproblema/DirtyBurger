import * as actionTypes from './actionTypes';
import axios from '../../axios-link';

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

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

//
export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredientsTest.json') 
            .then(response => {
                //this.setState({ ingredients: response.data });
                dispatch(setIngredients(response.data))
            }).catch(err => console.log(err.message));
    };
}