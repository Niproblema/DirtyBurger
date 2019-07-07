import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

const SideDrawer = (props) => {
    return (
        <Auxiliary>
            <Backdrop shown={props.shown} clicked={props.close} />
            <div className={classes.SideDrawer+" "+(props.shown ? classes.Open : classes.Closed)}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default SideDrawer;