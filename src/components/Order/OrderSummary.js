import React from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import uuid from 'uuid';
import Button from '../UI/Buttons/AcceptDecline/Button'

//TODO: tranform this for general use, not just custom Burgers

const OrderSummary = (props) => {
    const jxOrderList = Object.keys(props.items)
        .map(key => {
            return (
                <li key={uuid()}>
                    <span style={{ textTransform: 'capitalize' }}>
                        {key}: {props.items[key]}
                    </span>
                </li>
            )
        });

    return (
        <Auxiliary>
            <h3>Your Order:</h3>
            <p>Following items have been selected:</p>
            <ul>
                {jxOrderList}
            </ul>
            <p><strong>Total Price: {props.price}€</strong></p>
            <p>Proceed to checkout?</p>
            <div>
                <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
                <Button btnType="Success" clicked={props.continue}>CHECKOUT</Button>
            </div>
        </Auxiliary>
    );
}

export default OrderSummary;