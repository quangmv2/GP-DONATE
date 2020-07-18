import React from "react";
import { Link } from 'react-router-dom';
import './MessageDetail.scss';
import message from './MessageData';
const MessagesDetail = () => {
    let timeMessages = (<p className='mess-time'>Monday 14:25</p>)
    const RenderRecievemessage = () => {
        return _.map(message, ({content}) => {
            return (
                <div className='message-content-container recieve-message-content-container '>
                    <p>{content}</p>
                </div>
            )
        })
    }
    const RenderSendmessage = () => {
        return _.map(message, ({content}) => {
            return (
                <div className='message-content-container'>
                    <p>{content}</p>
                </div>
            )
        })
    }
               
    return (
        <div className='private-fullheight'>
            <div className='container'>
            <div className="top-navbar-giver-home message-top-nav">
                <div className="navbar-giver-home-container navbar-message-container">
                <button className='button-trans'><span className="icon-back back-messages"></span></button>
                    <Link to="/user-profile">
                        <img
                            src={
                                "./images/avatar/_0008_Alina Baikova.jpg"
                            }
                            className="giver-avatar"
                        />
                    </Link>
                    <div className="info-user">
                        <p className="username">
                            <Link to="/user-profile">
                                Alina{" "}
                            </Link>
                        </p>

                        <p className="hours-ago">
                            4 hours a go
                        </p>
                        </div>
                    </div>
                    <button className='button-trans'>
                <span className="icon-sort sort-messages"></span>
                </button>
            </div>
            {/* END HEADER NAV */}
            <div className='mess-body'>
            <div>
                {timeMessages}
                
            </div>
            <div className='render-recieve-message'>
            <img
            src={
            "./images/avatar/_0008_Alina Baikova.jpg"
            }
            className="recieve-avatar"
            />
                <div>
            {RenderRecievemessage()}
            </div>
           
            </div>
            <div className='render-message'>
            {RenderSendmessage()}
            </div>
            </div>
            <div className='input-messages-container'>
            <div className='input-message'>
                    <img
                        src={"./images/avatar/_0010_user.jpg"}
                        className="comment-avatar"
                    />
                    <div
                        className='input-comment-with-icon'>
                        <button className='arrow-next-button post-comment-button'>
                        <img
                            src={
                                "./images/icon/arrow-next.svg"
                            }
                            className="arrow-next-mess"
                        />
                        </button>
                        <textarea
                            wrap
                            type='text'
                            cols='3'
                            row='3'
                            placeholder='Write a comment...'
                        />
                    </div>
                </div>
                <hr className='bottom-border-message-detail'  align='center'/>
                </div>
        </div>
        </div>
    )
}
export default MessagesDetail;
