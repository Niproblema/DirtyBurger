import React, { Component } from 'react';
import classes from './Modal.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.shown !== this.props.shown;
    }

    render() {
        return (
            <Auxiliary>
                <Backdrop shown={this.props.shown} clicked={this.props.modalClose} />
                <div
                    className={classes.Modal}
                    style={
                        {
                            transform: this.props.shown ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: this.props.shown ? '1' : '0'
                        }
                    }>
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    }
}

export default Modal;