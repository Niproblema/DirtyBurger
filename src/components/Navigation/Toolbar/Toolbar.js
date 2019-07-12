import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import { withRouter } from "react-router";


const Toolbar = (props) => {
    const redirectHomeOnLogo = () => {
        props.history.push('/');
    }
    
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle click={props.toggleDrawer} />
            <div className={classes.Logo}>
                <Logo clicked={redirectHomeOnLogo} square="true" />
            </div>
            <nav className={classes.DesktopOnly}> {/* TODO: Maybe move this to whole Toolbar?? */}
                <NavItems isAuth={props.isAuth} />
            </nav>
        </header>
    );
}


export default withRouter(Toolbar);