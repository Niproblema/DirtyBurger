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
        menuDate : menu.date,
        categories : menu.categories,
        items : menu.items,
        fetchDate: new Date().getTime()
    }
}

const fetchMenuFailed = (error) => {
    return {
        type: actionTypes.MENU_FETCH_FAILED,
        fetchError: error
    }
}


export const fetchMenu = () => {
    return dispatch => {
        dispatch(fetchMenuStart());
        axios.get('menu.json')
            .then(res => {
/*             const newOrders = [];
                for (let key in res.data) {
                    newOrders.push(
                        {
                            id: key,
                            ...res.data[key]
                        }
                    );
                } */
                console.log(res);
                dispatch(fetchMenuSuccess(res));
            })
            .catch(err => {
                dispatch(fetchMenuFailed(err));
            })
    }
}

export const pushMenu = () => {

}

export const patchMenu = () => {

}