import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient';

const Burger = (props) => {
    //TODO fix ingredient order.
    const transformedIngredients = Object.keys(props.ingredients).map((ingredient) => {
            return [...Array(props.ingredients[ingredient])].map((_, i) => {
                return <BurgerIngredient key={ingredient + i} type={ingredient} />;
            });
        }).reduce((accumulator, val) => {
            return accumulator.concat(val);
        },[]);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients.length === 0 ? 
            <p>Add some toppings :)</p>
            :
            transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};


export default Burger;