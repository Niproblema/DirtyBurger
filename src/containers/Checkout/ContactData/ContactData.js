import React, { Component } from 'react'
import Button from '../../../components/UI/Buttons/AcceptDecline/Button'
import Classes from './ContactData.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={Classes.ContactData}>
                <h4>Enter Contact Data</h4>
                <form>
                    <input className={Classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={Classes.Input} type="text" name="email" placeholder="Your email" />
                    <input className={Classes.Input} type="text" name="street" placeholder="Street Adress" />
                    <input className={Classes.Input} type="text" name="postal" placeholder="Postal Code" />

                    <Button btnType="Success">Finalize Order</Button>
                </form>
            </div>)
    }

}

export default ContactData;