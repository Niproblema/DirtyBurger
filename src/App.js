import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
//import OrderBuilder from './containers/OrderBuilder/OrderBuilder'; //TODO: add back instead of burgerBuilder
import BurgerBuilder from './containers/CustomFood/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom'
import ContactData from './containers/Checkout/ContactData/ContactData'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'



class App extends Component {

  componentWillMount() {
    this.props.renewAuthState();  //TODO: this shoudl be in initial redux auth store state, as method is deprecated and maybe affects performance
  }

  render() {
    let routes;
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout/contact-data" component={ContactData} />
          <Route path="/logout" component={Logout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    renewAuthState: () => dispatch(actions.authRenewState())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
