import React from 'react'
import classes from './NavItems.css';
import { NavLink } from 'react-router-dom';

const NavItems = (props) => {
    const linkClick = (event) => {
        if (props.clicked) {
            //event.preventDefault();
            props.clicked();
        }
        return event;
    }

    const toShow = props.isAuth ?
        (
            <ul className={classes.NavItems}>
                <li className={classes.NavItem}>
                    <NavLink activeClassName={classes.active} onClick={linkClick} to="/menu" exact>Menu</NavLink>
                    <NavLink activeClassName={classes.active} onClick={linkClick} to="/" exact>Builder</NavLink>
                    <NavLink activeClassName={classes.active} onClick={linkClick} to="/orders" exact>Orders</NavLink>
                    <NavLink activeClassName={classes.active} onClick={linkClick} to="/logout" exact>Logout</NavLink>
                </li>
            </ul>

        ) :
        (<ul className={classes.NavItems}>
            <li className={classes.NavItem}>
                <NavLink activeClassName={classes.active} onClick={linkClick} to="/menu" exact>Menu</NavLink>
                <NavLink activeClassName={classes.active} onClick={linkClick} to="/" exact>Builder</NavLink>
                <NavLink activeClassName={classes.active} onClick={linkClick} to="/auth" exact>Login</NavLink>
            </li>
        </ul>);


    return toShow
}


export default NavItems;