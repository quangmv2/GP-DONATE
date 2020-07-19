import React, { useState, useEffect } from 'react';
import './PostOffer.scss';

const Button = props => {
    const [color, setColor] = useState(false);
    const [inputValue, setInputValue] = useState();
    const onChangeDay = () => {
        event.preventDefault();
        setColor(!color);
        console.log('a');
    }
   
    return (  
        <div onChange={props.onChangeWeekdays}>   
     <input type="checkbox" id={props.inputId} value={props.name}
     className='hiddenInput'
     onChange={onChangeDay}
     />
<label for={props.forId}> <p className={color ? 'checkedLabel' : 'uncheckedLabel'}>{props.label}</p></label>
      </div>
    )

};
export default Button;