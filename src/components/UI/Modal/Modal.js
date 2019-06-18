import React from 'react';
import classes from './Modal.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary'

const Modal = (props) => {
    return (
        <Auxiliary>
            <Backdrop shown={props.shown} clicked={props.modalClose} />
            <div
                className={classes.Modal}
                style={
                    {
                        transform: props.shown ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.shown ? '1' : '0'
                    }
                }>
                {props.children}
            </div>
        </Auxiliary>
    );
}

export default Modal;