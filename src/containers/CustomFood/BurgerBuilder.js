import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Food/CustomBuild/Burger/Burger';
import BuildController from '../../components/Food/CustomBuild/Burger/BuildController/BuildController';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    };

    render() {
        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <BuildController/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;