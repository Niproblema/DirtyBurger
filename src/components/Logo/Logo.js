import React from 'react';
import dbLogo_round from '../../assets/icons/db_round.png'
import dbLogo_rect from '../../assets/icons/db_rect.png'
import classes from './Logo.css';

const Logo = (props) => {

    const imgClick = (event) => {
        if(props.clicked){
            event.preventDefault();
            props.clicked();
        }else{
            return event;
        }
    }

    return (
        <div className={classes.Logo}  >
            <img src={props.square ? dbLogo_round : dbLogo_rect} onClick={imgClick} alt="Dirty Burger" />
        </div>
    );
}


export default Logo;