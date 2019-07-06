import React from 'react'
import classes from './NavItems.css';
import { NavLink } from 'react-router-dom';

const NavItems = () => {
    return (
        <ul className={classes.NavItems}>
            <li className={classes.NavItem}>
                <NavLink activeClassName={classes.active} to="/" exact>Builder</NavLink>
                <NavLink activeClassName={classes.active} to="/orders" exact>Orders</NavLink>
                <NavLink activeClassName={classes.active} to="/auth" exact>Login</NavLink>
            </li>
        </ul>
    );
}


export default NavItems;