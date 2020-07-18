import React, { useState, useEffect } from 'react';
import './PostOffer.scss';

const Button = props => {
    const [color, setColor] = useState(true);
    const onChangeDay = () => {
        event.preventDefault();
        setColor(!color);
    }

    return (
    <button onClick={onChangeDay} className={color ? 'button-trans' : 'button-choosen'}>{props.name}</button>
    )
};
export default Button;