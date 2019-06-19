import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        sdShown: false
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { return { sdShown: !prevState.sdShown } });
    }

    sideDrawerCloseHandler = () => {
        this.setState({ sdShown: false });
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar toggleDrawer={this.sideDrawerToggleHandler} />
                <SideDrawer shown={this.state.sdShown} close={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary >
        )
    }
}

export default Layout;