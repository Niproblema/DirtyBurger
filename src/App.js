import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
//import OrderBuilder from './containers/OrderBuilder/OrderBuilder'; //TODO: add back instead of burgerBuilder
import BurgerBuilder from './containers/CustomFood/BurgerBuilder';



class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder></BurgerBuilder>
        </Layout>
      </div>
    );
  }
}

export default App;
