import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Food/CustomBuild/Burger/Burger';
import BuildController from '../../components/Food/CustomBuild/Burger/BuildController/BuildController';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Order/OrderSummary'
import axios from '../../axios-link';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/ErrorHandling/withErrorHandler';
import * as reduxActions from '../../store/actions/index'; //Auto picks up index file, when pointing to root.



const LIMITS = {
    lower: 0,
    upper: 4
}

export class BurgerBuilder extends Component {
    state = {
        confirmationModalShown: false,
        loadingOrder: false
    };

    //EXAMPLE ON GETTIN DATA-INITIAL SETUP
    componentDidMount() {
        this.props.onInitIngredients();
        /*         axios.get('/ingredientsTest.json') 
                    .then(response => {
                        console.log(response);
                        this.setState({ ingredients: response.data });
                    }).catch(err => console.log(err.message)); */
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({ confirmationModalShown: true });
        } else {
            this.props.history.push('/auth');
        }
    }

    confirmationCancelHandler = () => {
        this.setState({ confirmationModalShown: false });
    }

    confirmationContinueHandler = () => {
        //Ingredients passes with redux
        //this.props.history.push('checkout/contact-data', { ingredients: this.props.ings, price: this.state.price });
        this.props.onInitPurchase();
        this.props.history.push('checkout/contact-data');
    }

    getPrice = () => this.props.price.toFixed(2);

    render() {
        const addEnabled = { ...this.props.ings };
        const removeEnabled = { ...addEnabled }
        for (let key in addEnabled) {
            addEnabled[key] = addEnabled[key] < LIMITS.upper;
            removeEnabled[key] = removeEnabled[key] > LIMITS.lower;
        }

        const modalContent = this.state.loadingOrder ?
            <Spinner /> : <OrderSummary price={this.getPrice()} cancel={this.confirmationCancelHandler} continue={this.confirmationContinueHandler} items={this.props.ings} />;

        return (
            <Auxiliary>
                <Modal shown={this.state.confirmationModalShown} modalClose={this.confirmationCancelHandler}>
                    {modalContent}
                </Modal>
                <Burger ingredients={this.props.ings} />
                <BuildController
                    addIngredient={this.props.onIngredientAdded}
                    removeIngredient={this.props.onIngredientRemoved}
                    addEnabled={addEnabled}
                    removeEnabled={removeEnabled}
                    order={this.purchaseHandler}
                    price={this.getPrice()}
                    isAuth={this.props.isAuth} />
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) =>
            dispatch(reduxActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => {
            dispatch(reduxActions.removeIngredient(ingName))
        },
        onInitIngredients: () => dispatch(reduxActions.initIngredients()),
        onInitPurchase: () => dispatch(reduxActions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));