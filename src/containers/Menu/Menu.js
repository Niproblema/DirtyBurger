import React, { Component } from 'react';
import classes from './Menu.css'
import MenuContent from '../../components/Menu/MenuContent/MenuContent'
import FoodLetterSelector from '../../components/Menu/MenuNav/FoodLetterSelector'
import FoodTypeSelector from '../../components/Menu/MenuNav/FoodTypeSelector'
import * as actions from '../../store/actions/index'
import axios from '../../axios-link'
import withErrorHandler from '../../hoc/ErrorHandling/withErrorHandler'
import { connect } from 'react-redux'

/* Food Menu btw */
class Menu extends Component {

    componentDidMount() {
        this.props.fetchMenu();
    }

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

const mapStateToProps = state => {
    return {
        menu: state.menu    
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchMenu: () => dispatch(actions.fetchMenu())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Menu, axios));