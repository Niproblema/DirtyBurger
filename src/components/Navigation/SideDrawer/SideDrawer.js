import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';
import { withRouter } from "react-router";

const SideDrawer = (props) => {
    //Todo: div around Backdrop temp fix-Drawer should close at some width
    return (
        <Auxiliary>
            <div className={classes.BackdropExtra}> 
                <Backdrop shown={props.shown} clicked={props.close} />
            </div>
            <div className={classes.SideDrawer + " " + (props.shown ? classes.Open : classes.Closed)}>
                <div className={classes.Logo}>
                    <Logo clicked={() => {          //Logo might be visible on narrow
                        props.close();
                        props.history.push('/')
                    }} />
                </div>
                <nav className={classes.Content}>
                    <NavItems isAuth={props.isAuth} clicked={props.close} />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default withRouter(SideDrawer);