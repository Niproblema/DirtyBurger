import React from 'react'
import PropTypes from 'prop-types'
import Classes from './Input.css'


const Input = (props) => {
    let inputElement = null;

    switch (props.inp_type) {
        case ('textArea'):
            inputElement = <textarea
                className={Classes.InputElement}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}
                />
            break;
        case ('select'):
            console.log(props);
            inputElement = <select
                className={Classes.InputElement}
                value={props.value}
                onChange={props.changed}>
                    {props.elementConfig.options.map(el => 
                        <option key={el.value} value={el.value}>{el.displayValue}</option>
                        )}
                </select>
            break;
        case ('input'):
        default:
            inputElement = <input
                className={Classes.InputElement}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>
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