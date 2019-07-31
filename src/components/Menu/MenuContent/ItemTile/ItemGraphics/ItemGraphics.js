import React from 'react';
import sampleImage from '../../../../../assets/images/sampleImage.jpg'
import classes from './ItemGraphics.css'

const ItemGraphics = (props) => {
    return <img className={classes.ItemGraphics} src={sampleImage} alt={props.name} />;
}

export default ItemGraphics;