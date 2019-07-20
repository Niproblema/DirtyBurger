import React, { Component } from 'react';
import classes from './Menu.css'
import MenuContent from '../../components/Menu/MenuContent/MenuContent'
import FoodLetterSelector from '../../components/Menu/MenuNav/FoodLetterSelector'
import FoodTypeSelector from '../../components/Menu/MenuNav/FoodTypeSelector'
//import Auxiliary from '../../hoc/Auxiliary'
import firebase from '../../Database/Firebase/firebase'

/* Food Menu btw */
class Menu extends Component {

    render() {
        return (
            <div className={classes.Menu} >
                <FoodTypeSelector />
                <div className={classes.MenuMainContainer}>
                    <FoodLetterSelector />
                    <MenuContent />

                </div>
            </div>
        );
    }
}

export default Menu;