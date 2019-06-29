import React, { Component } from 'react'
import Button from '../../../components/UI/Buttons/AcceptDecline/Button'
import Classes from './ContactData.css'
import axios from '../../../axios-link';
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loadingOrder: false,
        confirmationModalShown: false
    }

    componentDidMount() {
        console.log(this.props.location.state);
    }

    orderHandler = (event) => {
        event.preventDefault();

        if (!(this.props.location.state.ingredients && this.props.location.state.price))  //Cancel if props ain't set.
            return; //TODO: return a real error....

        this.setState({ loadingOrder: true });

        const order = {
            ingredients: this.props.location.state.ingredients,
            price: this.props.location.state.price,
            constumer: {
                name: "placeholder",
                address: {
                    state: "Temp State",
                    street: "Temp Street 1",
                    zip: "1234"
                }
            },
            deliveryMethod: "Fastests",
            info: "Burger ordered from DirtyBurger App!"
        }
        axios.post('/dbOrders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loadingOrder: false, confirmationModalShown: false });
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error);
                this.setState({ loadingOrder: false, confirmationModalShown: false });
            });

    }

    render() {
        let form = null
        if (this.state.loadingOrder) {
            form = <Spinner />
        } else {
            form = (
                <form>
                    <input className={Classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={Classes.Input} type="text" name="email" placeholder="Your email" />
                    <input className={Classes.Input} type="text" name="street" placeholder="Street Adress" />
                    <input className={Classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>Finalize Order</Button>
                </form>
            )
        }

        return (
            <div className={Classes.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;