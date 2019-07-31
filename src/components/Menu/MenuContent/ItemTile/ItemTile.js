import React from 'react'
import classes from './ItemTile.css'
import ItemGraphics from './ItemGraphics/ItemGraphics'

/**
 * ItemTile - Holds item image(icon/photo) + description(short/long) + add to order button.
 * Expand mode should show extra info by enlarging, non-expand mode show extra info elsewhere (side panel maybe).
 * @param {item, expandable} props 
 */
const ItemTile = (props) => {
    return (
        <div className={classes.ItemTile} >
            <ItemGraphics name={props.item.name}/>
            <p><strong>{props.item.name}</strong></p>
            
        </div>
    );
}

export default ItemTile;