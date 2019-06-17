import React from 'react';
import classes from './ControlFragment.css'

const ControlFragment = (props) => {
    return(
        <div className={classes.CFragment}>
            <div className={classes.Label} >{props.label}</div>
            <button className={classes.Less}>Less</button>
            <button className={classes.More}>More</button>
        </div>
    );
};

export default ControlFragment;