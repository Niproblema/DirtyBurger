import React from 'react'
import classes from './ItemTile.css'

/**
 * ItemTile - Holds item image(icon/photo) + description(short/long) + add to order button.
 * Expand mode should show extra info by enlarging, non-expand mode show extra info elsewhere (side panel maybe).
 * @param {item, expandable} props 
 */
const ItemTile = (props) => {
    return (
        <div className={classes.ItemTile} >
            {props.item.name}
        </div>
    );
}

export default ItemTile;