import React from 'react'
import PropTypes from 'prop-types'
import Classes from './Input.css'


const Input = (props) => {
    let inputElement = null;

    switch (props.inp_type) {
        case ('textArea'):
            inputElement = <textarea  className={Classes.InputElement} {...props} />
            break;
        case ('input'):
        default:
            inputElement = <input  className={Classes.InputElement} {...props} />
            break;
    }

    return (
        <div className={Classes.Input}>
            <label className={Classes.Label} >{props.label}</label>
            {inputElement}
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    inp_type: PropTypes.string
}


export default Input