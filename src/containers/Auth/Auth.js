import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Buttons/AcceptDecline/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import Classes from './Auth.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';


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
                    placeholder: 'Password'
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                    valid: false,
                    touched: false
                }
            }
        },
        isSignup: false
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

    loginAttemptHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.loginForm.userName.value, this.state.loginForm.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {
        let form = null
        // "Enter New Account Information" : "Enter Login Information";
        let formTitle, formSubmitButtonText, formSwitchButtonText;
        if (this.state.isSignup) {
            formTitle = "Enter New Account Information";
            formSubmitButtonText = "Sign Up";
            formSwitchButtonText = "Login"
        } else {
            formTitle = "Enter Login Information";
            formSubmitButtonText = "Login";
            formSwitchButtonText = "Sign Up"
        }

        let errorMessage = null;
        if (this.props.authError) {
            errorMessage = (<p className={Classes.ErrorMessage}>Error: {this.props.authError.message}</p>);
            //TODO: error codes.
        }

        if (this.props.isAuth) {
            form = <Redirect to="/" />
        } else {
            const formElementsArr = [];
            for (let key in this.state.loginForm) {
                formElementsArr.push({
                    id: key,
                    config: this.state.loginForm[key]
                });
            }

            let formValid = true;
            formElementsArr.map(el => {     //TODO: Browser autofill messes this up btw
                if (!el.config.validation.valid && !el.config.validation.touched)
                    formValid = false;
                return null;
            });


            if (this.props.isLoading) {
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
                        <Button btnType="Success" disabled={!formValid}>{formSubmitButtonText}</Button>
                    </form>)
            }
        }

        return (
            <div className={Classes.Auth}>
                <h4>{formTitle}</h4>
                {errorMessage}
                {form}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>Switch to {formSwitchButtonText}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.loading,
        authError: state.auth.error,
        isAuth: state.auth.token !== null
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);