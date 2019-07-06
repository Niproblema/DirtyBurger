import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Buttons/AcceptDecline/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import Classes from './Auth.css'

class Auth extends Component {
    state = {
        loginForm: {
            userName: {
                inp_type: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Username'
                },
                value: "",
                validation: {
                    required: true,
                    valid: false,
                    isEmail: true,
                    touched: false
                }
            },
            password: {
                inp_type: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                    valid: false,
                    touched: false
                }
            }
        }
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

    inputChangedHandler(event, inputID) {
        const stateShallowCopy = { ...this.state.loginForm };
        const toChangeField = { ...stateShallowCopy[inputID] };
        toChangeField.value = event.target.value;
        toChangeField.validation.valid = this.checkValidity(toChangeField.value, toChangeField.validation);
        toChangeField.validation.touched = true;
        stateShallowCopy[inputID] = toChangeField;
        this.setState({
            ...this.state,
            loginForm: stateShallowCopy
        });
    }

    loginAttemptHandler() {

    }



    render() {
        let form = null
        //if (!this.props.orderReady) {
        //    form = <Redirect to="/" />
        //} else {

        const formElementsArr = [];
        for (let key in this.state.loginForm) {
            formElementsArr.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        let formValid = true;
        formElementsArr.map(el => {
            if (!el.config.validation.valid)
                formValid = false;
            return null;
        });


        if (false /*this.state.loadingOrder*/) {
            form = <Spinner />
        } else {
            form =
                (<form onSubmit={this.loginAttemptHandler}>
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
                    <Button btnType="Success" disabled={!formValid}>Login</Button>
                </form>)
        }

        return (
            <div className={Classes.Auth}>
                <h4>Enter Login Information</h4>
                {form}
            </div>
        );
    }
}

export default Auth;