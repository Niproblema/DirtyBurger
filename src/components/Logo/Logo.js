import React from 'react';
import burgerLogo from '../../assets/icons/burger-logo.png'
import classes from './Logo.css';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Dirty Burger" />
    </div>
)

export default Logo;