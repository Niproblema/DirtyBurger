import React from 'react';
import classes from './MenuContent.css'
import ItemTile from './ItemTile/ItemTile'

const MenuContent = (props) => {
    return (
        <div className={classes.MenuContent}>
            {props.items.map((item, index)=><ItemTile item={item} key={index} expandable={true} />)}
        </div>
    );
}

export default MenuContent;