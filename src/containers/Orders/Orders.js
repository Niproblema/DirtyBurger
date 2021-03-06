import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-link'
import withErrorHandler from '../../hoc/ErrorHandling/withErrorHandler'
import { connect } from 'react-redux'


class Orders extends Component {
    state = {
        orders: [],
        loadingOrders: true
    }


    componentDidMount() {
        axios.get('dbOrders.json?auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"')
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

                this.setState({ orders: newOrders, loadingOrders: false })
            })
            .catch(err => {
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

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(withErrorHandler(Orders, axios));