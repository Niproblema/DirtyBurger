import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux'

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
                <Toolbar isAuth={this.props.isAuthenticated} toggleDrawer={this.sideDrawerToggleHandler} />
                <SideDrawer isAuth={this.props.isAuthenticated} shown={this.state.sdShown} close={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary >
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);