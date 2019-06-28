import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
//import OrderBuilder from './containers/OrderBuilder/OrderBuilder'; //TODO: add back instead of burgerBuilder
import BurgerBuilder from './containers/CustomFood/BurgerBuilder';
import { Route, Switch } from 'react-router-dom'
import ContactData from './containers/Checkout/ContactData/ContactData'



class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout/contact-data" component={ContactData} />
            {/*<Route path="/checkout"  />*/}
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
