import React from 'react';
import classes from './BuildController.css';
import ControlFragment from './ControlFragment/ControlFragment';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'mmeat'}
]

const BuildController = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(crtl => {
            return <ControlFragment key={crtl.label} label={crtl.label}/>
        })}
    </div>
);

export default BuildController;