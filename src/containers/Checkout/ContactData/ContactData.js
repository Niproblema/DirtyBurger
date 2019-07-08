import React, { Component } from 'react'
import Button from '../../../components/UI/Buttons/AcceptDecline/Button'
import Classes from './ContactData.css'
import axios from '../../../axios-link';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import * as reduxActions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                inp_type: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: "",
                validation: {
                    required: true,
                    valid: false,
                    touched: false
                }
            },
            country: {
                inp_type: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: "",
                validation: {
                    required: true,
                    valid: false,
                    touched: false
                }
            },
            street: {
                inp_type: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: "",
                validation: {
                    required: true,
                    valid: false,
                    touched: false
                }
            },
            zip: {
                inp_type: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 7,
                    valid: false,
                    touched: false
                }
            },
            email: {
                inp_type: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: "",
                validation: {
                    required: true,
                    valid: false,
                    touched: false
                }
            },
            deliveryMethod: {
                inp_type: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: "",
                validation: {
                    valid: true,
                    touched: false
                }
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

        if (!(this.props.ings && this.props.price))  //Cancel if props ain't set.
            return; //TODO: return a real error....

        this.setState({ loadingOrder: true });

        const formData = {};
        for (let formElementKey in this.state.orderForm) {
            formData[formElementKey] = this.state.orderForm[formElementKey].value;
        }


        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        axios.post('/dbOrders.json?auth='+this.props.token, order)
            .then(response => {
                console.log(response);
                this.setState({ loadingOrder: false, confirmationModalShown: false });
                //this.props.history.push('/')
                this.props.onOrderFin();
            })
            .catch(error => {
                console.log(error);
                this.setState({ loadingOrder: false, confirmationModalShown: false });
            });

    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            if (value.trim() === '') isValid = false;
        }
        if (rules.minLength) {
            if (value.trim().length < rules.minLength) isValid = false;
        }
        if (rules.maxLength) {
            if (value.trim().length > rules.maxLength) isValid = false;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }


        return isValid;
    }


    inputChangedHandler = (event, inputID) => {
        const stateShallowCopy = { ...this.state.orderForm };
        const toChangeField = { ...stateShallowCopy[inputID] };
        toChangeField.value = event.target.value;
        toChangeField.validation.valid = this.checkValidity(toChangeField.value, toChangeField.validation);
        toChangeField.validation.touched = true;
        stateShallowCopy[inputID] = toChangeField;
        this.setState({ orderForm: stateShallowCopy });
    }

    render() {
        let form = null
        if (!this.props.orderReady) {
            form = <Redirect to="/" />
        } else {

            const formElementsArr = [];
            for (let key in this.state.orderForm) {
                formElementsArr.push({
                    id: key,
                    config: this.state.orderForm[key]
                });
            }

            let formValid = true;
            formElementsArr.map(el => {
                if (!el.config.validation.valid)
                    formValid = false;
                return null;
            });


            if (this.state.loadingOrder) {
                form = <Spinner />
            } else {
                form = (
                    <form onSubmit={this.orderHandler}>
                        {formElementsArr.map(el => (
                            <Input
                                key={el.id}
                                inp_type={el.config.inp_type}
                                elementConfig={el.config.elementConfig}
                                value={el.config.value}
                                invalid={el.config.validation ? !el.config.validation.valid : false}
                                touched={el.config.validation.touched}
                                changed={(event) => this.inputChangedHandler(event, el.id)}
                            />
                        ))}
                        <Button btnType="Success" disabled={!formValid}>Finalize Order</Button>
                    </form>
                )
            }
        }

        return (
            <div className={Classes.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        orderReady: state.order.orderReady,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderFin: () =>
            dispatch(reduxActions.purchaseFin())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactData);