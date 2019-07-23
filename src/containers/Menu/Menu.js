import React, { Component } from 'react';
import classes from './Menu.css'
import MenuContent from '../../components/Menu/MenuContent/MenuContent'
import FoodLetterSelector from '../../components/Menu/MenuNav/FoodLetterSelector'
import FoodTypeSelector from '../../components/Menu/MenuNav/FoodTypeSelector'
import * as actions from '../../store/actions/index'
import axios from '../../axios-link'
import withErrorHandler from '../../hoc/ErrorHandling/withErrorHandler'
import { connect } from 'react-redux'

/**
 * Save state when unmounting, so when component loads again,
 * we can restore it in constructor.
 * IMPORTANT: Only one Menu instance can be used per session!
 */
let savedState = null;

/* Food Menu btw */
class Menu extends Component {
    state = savedState !== null ? savedState : {
        //Rerender dependant items - Only when these chnage it's okay to rerender.
        sortedItems: [],
        sortedCategories: [],
        //
        //Rerender independant items - Don't cause rerender directly for these.
        selectedCategories: {},  //ID:boolean btw //Empty=All selected. Otherwise only listed are active.
        selectedOptions: {}      //todo: vegan and other weird eating disorders options.
    }


    componentDidMount() {
        //Data is fetched only when needed. Deciding logics in menu actions -> fetchMenu(force=false);
        this.props.fetchMenu();
    }

    componentWillUnmount() {
        /*Recycle state so it is reused next time Menu mounts. Don't use multiple Menu instaces per session. 
        If this this not used, find a way to create state without needlessly fetching and rerendering component multiple times.*/
        savedState = this.state;
    }


    /** 
     * Updates state with new props and maybe cause rerender.
     * Also does content sorting.
     */
    updateMenu(newProps) {
        //Sort selected categories
        const sortedCategories = newProps.menu.categories.filter((cat, catIndex) => cat !== null && (Object.keys(this.state.selectedCategories).length === 0 || this.state.selectedCategories[catIndex])).sort((a, b) => {
            //Sort function
            if (a.sortIndex !== b.sortIndex)
                return b.sortIndex - a.sortIndex; //Higher index has priority
            else
                return (a.name < b.name ? -1 : 1);
        });
        //Sort items in selected categories
        const sortedItems = newProps.menu.items.filter(item => {
            //Only display item if it is contained in any of selected categories.
            if (item !== null) {
                if (Object.keys(this.state.selectedCategories).length === 0) return true;
                for (let k = 0; k < item.categoriesIDs.length; k++) {
                    if (this.state.selectedCategories[item.categoriesIDs[k]]) return true;
                }
            }
            return false;
        }).sort((a, b) => (a.name < b.name ? -1 : 1));
        //console.log(sortedCategories);
        //console.log(sortedItems);
        this.setState({
            sortedItems: sortedItems,
            sortedCategories: sortedCategories
        });
    }

    /** Controls rerendering logics. Props change don't cause rerender-instead update menu state, that causes rerender. */
    shouldComponentUpdate(nextProps, nextState) {
        let shouldReRender = false;
        //When UI data changes -> rerender
        if (this.state.sortedItems !== nextState.sortedItems || this.state.sortedCategories !== nextState.sortedCategories) {
            shouldReRender = true;
            console.log("UI menu changed -> rerender");
        }

        //When menu data changes or view options chnage -> rebuild state with updateState() -> causes rerender.
        if (//When selected category changes
            this.state.selectedOptions !== nextState.selectedOptions ||
            this.state.selectedCategories !== nextState.selectedCategories
            ||
            //When store's menu changes
            this.props.menu.menuDate !== nextProps.menu.menuDate ||
            this.props.menu.categories !== nextProps.menu.categories ||
            this.props.menu.items !== nextProps.menu.items) {
            this.updateMenu(nextProps);
        }

        //When loading or showing error -> rerender
        if (this.props.menu.fetching !== nextProps.menu.fetching ||
            this.props.menu.fetchError !== nextProps.menu.fetchError ||
            this.props.menu.pushing !== nextProps.menu.pushing ||
            this.props.menu.pushError !== nextProps.menu.pushError) {
            console.log("Menu loading/error changed -> rerender");
            shouldReRender = true;
        }
        return shouldReRender;
    }

    render() {
        console.log("LOG - Menu renders!");
        return (
            <div className={classes.Menu} >
                <FoodTypeSelector categories={this.state.sortedCategories} />
                <div className={classes.MenuMainContainer}>
                    <FoodLetterSelector />
                    <MenuContent items={this.state.sortedItems} />
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
        fetchMenu: (force) => dispatch(actions.fetchMenu(force))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Menu, axios));