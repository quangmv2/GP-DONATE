import React from "React";
import messData from './messData';
import './Mess.scss';
import { Link } from 'react-router-dom';

const MessagesComponent = () => {
    const renderMessage = () => {
        return _.map(messData, ({ username, content }) => {
            return (
                <>
                <Link className='message-component-container message-preview-container' >
                    <div className='message-component-container'>
                    <img
                        src={"./images/avatar/_0008_Alina Baikova.jpg"}
                        className="mess-avatar"
                    />
                    <div className="info-user mess-content-container">
                        <p className='username'>{username}</p>
                        <p className='mess-content'>{content}</p>
                    </div>
                    </div>
                    <p className='mess-hours-ago'>3 hours ago </p>
           
                </Link>
                <hr className='mess-border-bottom'/>
                </>

            );
        });
    }
    return (
        <div>
            {renderMessage()}
        </div>
    )

};
export default MessagesComponent;