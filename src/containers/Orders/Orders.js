import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-link'
import withErrorHandler from '../../hoc/ErrorHandling/withErrorHandler'


class Orders extends Component {
    state = {
        orders: [],
        loadingOrders: true
    }


    componentDidMount() {
        axios.get('dbOrders.json')
            .then(res => {
                console.log(res);
                const newOrders = [];
                for (let key in res.data) {
                    newOrders.push(
                        {
                            id: key,
                            ...res.data[key]
                        }
                    );
                }

                this.setState({ orders: newOrders, loadingOrders: false })
            })
            .catch(err => {
                console.log(err);
                this.setState({ loadingOrders: false })
            })
    }

    render() {
        //TODO: loading and error handling for user.
        return (
            <div>
                {this.state.orders.map(order => <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    constumer={order.constumer}
                    delivery={order.deliveryMethod}
                    info={order.info}
                />)}
            </div>
        );

    }
}

export default withErrorHandler(Orders, axios);