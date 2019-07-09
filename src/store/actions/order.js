import * as actionTypes from './actionTypes';
import axios from '../../axios-link';

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseFin = () => {
    return {
        type: actionTypes.PURCHASE_FIN
    }
}

//Fetching order 
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}
export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
} 

export const fetchOrders = () => {
    return dispatch => {
        axios.get('dbOrders.json')
        .then(res => {
            const newOrders = [];
            for (let key in res.data) {
                newOrders.push(
                    {
                        id: key,
                        ...res.data[key]
                    }
                );
            }
            dispatch(fetchOrdersSuccess(newOrders))
            //this.setState({ orders: newOrders, loadingOrders: false })
        })
        .catch(err => {
            dispatch(fetchOrdersFailed(err));
            //this.setState({ loadingOrders: false })
        })
    }
}