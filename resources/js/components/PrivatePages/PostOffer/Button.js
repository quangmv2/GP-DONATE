import React, { useState, useEffect } from 'react';
import './PostOffer.scss';

const Button = props => {
  

    return (
        <div onClick={() => {props.onChangeWeekdays(props.index, props.inputId, props.name)}}>
            <input type="checkbox" value={props.name}
                className='hiddenInput'
            />
            <label htmlFor={props.forId}> <p className={props.active ? 'checkedLabel' : 'uncheckedLabel'}>{props.label}</p></label>
        </div>
    )

};
export default Button;