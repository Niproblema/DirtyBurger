import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import OrderBuilder from './containers/OrderBuilder/OrderBuilder'


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <OrderBuilder></OrderBuilder>
        </Layout>
      </div>
    );
  }
}

export default App;
