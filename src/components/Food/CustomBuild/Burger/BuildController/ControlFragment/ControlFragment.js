import React from 'react';
import classes from './ControlFragment.css'

const ControlFragment = (props) => {
    return(
        <div className={classes.CFragment}>
            <div className={classes.Label} >{props.label}</div>
            <button className={classes.Less} onClick={props.removeIngredient} disabled={!props.removeEnabled}>Less</button>
            <button className={classes.More} onClick={props.addIngredient} disabled={!props.addEnabled}>More</button>
        </div>
    );
};

export default ControlFragment;