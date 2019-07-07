import React from 'react';
import classes from './BuildController.css';
import ControlFragment from './ControlFragment/ControlFragment';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const BuildController = (props) => (
    <div className={classes.BuildControls}>
        <p>Price: <strong>{props.price}€</strong></p>
        {controls.map(crtl => {
            return <ControlFragment
                key={crtl.label}
                label={crtl.label}
                addIngredient={() => props.addIngredient(crtl.type)}
                removeIngredient={() => props.removeIngredient(crtl.type)}
                addEnabled={props.addEnabled[crtl.type]}
                removeEnabled={props.removeEnabled[crtl.type]} />
        })}
        <button className={classes.OrderButton} onClick={props.order}>{props.isAuth?'NEXT':'SIGN IN'}</button>
    </div>
);

export default BuildController;