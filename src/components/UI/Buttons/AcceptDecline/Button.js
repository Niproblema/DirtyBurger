import React from 'react';
import classes from './Button.css';
import PropTypes from 'prop-types'

const Button = (props) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}   
        onClick={props.clicked} >{props.children}</button>
);

Button.propTypes = {
    btnType: PropTypes.string   //btnType = Danger/Success
}


export default Button