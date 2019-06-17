import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes  from './Layout.css';

const Layout = (props) => {

    return (
        <Auxiliary>
            <div>
                 Here goes Toolbar SideDrawer, Backdrop... 
            </div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    );
};

export default Layout;