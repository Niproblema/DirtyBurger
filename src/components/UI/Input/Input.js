import React from 'react'
import PropTypes from 'prop-types'
import Classes from './Input.css'


const Input = (props) => {
    let inputElement = null;
    const inputClasses = [Classes.InputElement];

    if(props.invalid && props.touched){
        console.log(props.touched);
        inputClasses.push(Classes.Invalid);
    }

    switch (props.inp_type) {
        case ('textArea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}
                />
            break;
        case ('select'):
            inputElement = <select
                className={inputClasses.join(' ')}
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
                className={inputClasses.join(' ')}
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