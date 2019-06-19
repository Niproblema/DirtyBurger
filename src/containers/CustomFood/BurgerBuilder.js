import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Food/CustomBuild/Burger/Burger';
import BuildController from '../../components/Food/CustomBuild/Burger/BuildController/BuildController';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Order/OrderSummary'

const PRICES = {
    salad: 0.4,
    cheese: 0.3,
    meat: 1.8,
    bacon: 0.8,
    basePrice: 2.0
}

const LIMITS = {
    lower: 0,
    upper: 4
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        price: PRICES.basePrice,
        confirmationModalShown: false
    };


    addIngredientHandler = (type) => {
        let oldState = { ...this.state.ingredients };
        if (oldState[type] < LIMITS.upper) {
            oldState[type]++;
            this.updateIngredients(oldState);
        }
    };

    removeIngredientHandler = (type) => {
        let oldState = { ...this.state.ingredients };
        if (oldState[type] > LIMITS.lower) {
            oldState[type]--;
            this.updateIngredients(oldState);
        }
    };

    /**
     * Updates state with new ingredient list and updated cost. Input = new igredient list.
     */
    updateIngredients = (newState) => {
        let keys = Object.keys(newState);
        let newCost = Object.values(newState).reduce((acc, val, index) => {
            return acc += val * PRICES[keys[index]];
        }, PRICES.basePrice);
        this.setState({
            ingredients: newState,
            price: newCost
        });
    }

    purchaseHandler = () => {
        this.setState({ confirmationModalShown: true });
    }

    confirmationCancelHandler = () => {
        this.setState({ confirmationModalShown: false });
    }

    confirmationContinueHandler = () => {
        alert('Checked out!');
    }

    getPrice = () => this.state.price.toFixed(2);

    render() {
        const addEnabled = { ...this.state.ingredients };
        const removeEnabled = { ...addEnabled }
        for (let key in addEnabled) {
            addEnabled[key] = addEnabled[key] < LIMITS.upper;
            removeEnabled[key] = removeEnabled[key] > LIMITS.lower;
        }
        return (
            <Auxiliary>
                <Modal shown={this.state.confirmationModalShown} modalClose={this.confirmationCancelHandler}>
                    <OrderSummary price={this.getPrice()} cancel={this.confirmationCancelHandler} continue={this.confirmationContinueHandler} items={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildController
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    addEnabled={addEnabled}
                    removeEnabled={removeEnabled}
                    order={this.purchaseHandler}
                    price={this.getPrice()} />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;