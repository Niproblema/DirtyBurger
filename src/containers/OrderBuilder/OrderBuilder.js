import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';

class OrderBuilder extends Component{
    render(){
        return(
            <Auxiliary>
                <div>Burger</div>
                <div>Burger controls</div>
            </Auxiliary>
        );
    }
}

export default OrderBuilder;