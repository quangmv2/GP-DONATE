import React from 'react';
import './Modal.scss';
import PostComment  from '../HomeComment/PostComment';

const modal = (props) => {
    return (
       <PostComment onCloseModal={props.close}/>
    )
}

export default modal;