import React from 'react'
import classes from './NavItems.css';

const NavItems = () => {
    return (
        <ul className={classes.NavItems}>
            <li className={classes.NavItem}>
                <a className={true ? classes.active : null} href="/">Builder</a>
                <a className={false ? classes.active : null} href="/">Checkout</a>
            </li>
        </ul>
    );
}


export default NavItems;