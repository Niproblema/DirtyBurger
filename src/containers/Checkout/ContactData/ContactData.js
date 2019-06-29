import React, { Component } from 'react'
import Button from '../../../components/UI/Buttons/AcceptDecline/Button'
import Classes from './ContactData.css'
import axios from '../../../axios-link';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                inp_type: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ""
            },
            country: {
                inp_type: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ""
            },
            street: {
                inp_type: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ""
            },
            zip: {
                inp_type: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ""
            },
            email: {
                inp_type: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ""
            },
            deliveryMethod: {
                inp_type: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: ""
            }
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

        /* const order = {
            ingredients: this.props.location.state.ingredients,
            price: this.props.location.state.price,
            constumer: {
                name: "placeholder",
                address: {
                    state: "Temp State",
                    street: "Temp Street 1",
                    zip: "1234"
                },
                email: "temp@gmail.com"
            },
            deliveryMethod: "Fastests",
            info: "Burger ordered from DirtyBurger App!"
        }*/
        /*         axios.post('/dbOrders.json', order)
                    .then(response => {
                        console.log(response);
                        this.setState({ loadingOrder: false, confirmationModalShown: false });
                        this.props.history.push('/')
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({ loadingOrder: false, confirmationModalShown: false });
                    }); */

    }

    inputChangedHandler = (event, inputID) => {
        const stateShallowCopy = {...this.state.orderForm};
        const toChangeField = { ...stateShallowCopy[inputID] };
        toChangeField.value = event.target.value;
        stateShallowCopy[inputID] = toChangeField;
        this.setState({ orderForm : stateShallowCopy });
    }

    render() {
        const formElementsArr = [];
        for (let key in this.state.orderForm) {
            formElementsArr.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = null
        if (this.state.loadingOrder) {
            form = <Spinner />
        } else {
            form = (
                <form>
                    {formElementsArr.map(el => (
                        <Input
                            key={el.id}
                            inp_type={el.config.inp_type}
                            elementConfig={el.config.elementConfig}
                            value={el.config.value}
                            changed={(event) => this.inputChangedHandler(event, el.id)}
                        />
                    ))}
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