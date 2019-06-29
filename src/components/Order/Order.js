import React from 'react';
import classes from './Order.css'

const Order = (props) => {
    let ingredientSpanList =
        Object.entries(props.ingredients)
            .filter(i => i[1] > 0)
            .map(([a, b]) => <span
                className={classes.IngredientSpan}
                key={a}>{a}: {b}</span>
            );

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientSpanList}</p>
            <p>Price: <strong>{props.price.toFixed(2) + "€"}</strong></p>
        </div>
    )
}

export default Order;