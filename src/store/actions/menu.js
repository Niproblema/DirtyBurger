import * as actionTypes from './actionTypes';
import axios from '../../axios-link';


const fetchMenuStart = () => {
    return {
        type: actionTypes.MENU_FETCH_START
    }
}

const fetchMenuSuccess = (data) => {    //PARSE
    const menu = data.data;
    return {
        type: actionTypes.MENU_FETCH_SUCCESS,
        menuDate: menu.date,
        categories: menu.categories,
        items: menu.items,
        fetchDate: new Date().getTime()
    }
}

const fetchMenuFailed = (error) => {
    return {
        type: actionTypes.MENU_FETCH_FAILED,
        fetchError: error
    }
}

/**
 * Method fetches data for menu store if menu store has not been populated yet in this session 
 * or if TODO: it's older than 1h. In latter case TODO: checks remote menu version and decides to fetch or nah.
 * @param {*} force force fetches data either way.
 */
export const fetchMenu = (force = false) => {
    return (dispatch, getState) => {
        if (force || getState().menu.menuDate === null) {   //TODO: restorting state from last session+check for outdated menu.
            dispatch(fetchMenuStart());
            axios.get('menu.json')
                .then(res => {
                    console.log(res);
                    dispatch(fetchMenuSuccess(res));
                })
                .catch(err => {
                    dispatch(fetchMenuFailed(err));
                })
        }
    }
}

export const pushMenu = () => {

}

export const patchMenu = () => {

}