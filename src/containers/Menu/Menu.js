import React, { Component } from 'react';
import classes from './Menu.css'
import MenuContent from '../../components/Menu/MenuContent/MenuContent'
import FoodLetterSelector from '../../components/Menu/MenuNav/FoodLetterSelector'
import FoodTypeSelector from '../../components/Menu/MenuNav/FoodTypeSelector'


/* Food Menu btw */
class Menu extends Component {

    render() {
        return (
            <div className={classes.Menu} >
                <MenuContent />
                <FoodLetterSelector />
                <FoodTypeSelector />
            </div>
        );
    }
}

export default Menu;