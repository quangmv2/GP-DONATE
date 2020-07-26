import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import './MessageDetail.scss';
import message from './MessageData';
import { fetchService } from "services";
import { GET_MESSAGE_DETAILS, SEND_MESSAGE } from "../../../../constants";
import {
    selectUserInfo
} from "modules/auth/selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
const MessagesDetail = props => {

    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const bodyMess = useRef();

    useEffect(() => {
        getFirst();
    }, []);

    const getFirst = async () => {
        await getMessageDetail();
        bodyMess.current.scrollTop = 5000;
    }

    const getMessageDetail = async () => {
        const [messages, status] = await fetchService.fetch(GET_MESSAGE_DETAILS(props.data.id));
        if (status == 200) {
            setData(messages.data);
        }
    }

    const sendMessage = async () => {
        if (input == '') return;
        const data = {
            to: props.data.id,
            content: input
        }
        const [message, status] = await fetchService.fetch(SEND_MESSAGE(), {
            method: "POST",
            body: JSON.stringify(data)
        });
        if (status === 200) {
            setData(dataMess => [message, ...dataMess]);
            setInput('');
        }
    }

    const { userInfo } = props;

    let timeMessages = (<p className='mess-time'>Monday 14:25</p>)

    const RenderRecievemessage = () => {
        return _.map(message, ({ content }) => {
            return (
                <div className='message-content-container recieve-message-content-container '>
                    <p>{content}</p>
                </div>
            )
        })
    }
    const RenderSendmessage = () => {
        return _.map(message, ({ content }) => {
            return (
                <div className='message-content-container'>
                    <p>{content}</p>
                </div>
            )
        })
    }

    const renderMessages = () => {
        const message = [...data];
        return _.map(message.reverse(), ({ id, content, user_id, user_id_to }) => {
            if (userInfo.id == user_id)
                return (
                    <div className='render-message' key={`message send ${id}`}>
                        <div className='message-content-container'>
                            <p>{content}</p>
                        </div>
                    </div>
                )
            return (
                <div className='render-recieve-message' key={`message recieve ${id}`}>
                    <div>
                        <div className='message-content-container recieve-message-content-container'>
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className='private-fullheight' style={{ position: "absolute", zIndex: 1000, width: "100%" }}>
            <div className='container'>
                <div className="top-navbar-giver-home message-top-nav">
                    <div className="navbar-giver-home-container navbar-message-container">
                        <button className='button-trans' onClick={props.closeWindow}>
                            <span className="icon-back back-messages"></span>
                        </button>
                        <Link to="/user-profile">
                            <img
                                src={
                                    "/images/avatar/_0008_Alina Baikova.jpg"
                                }
                                className="giver-avatar"
                            />
                        </Link>
                        <div className="info-user">
                            <p className="username">
                                <Link to="/user-profile">
                                   {`${props.data.first_name} ${props.data.last_name}`}
                                </Link>
                            </p>

                            <p className="hours-ago">
                                {/* 4 hours a go */}
                        </p>
                        </div>
                    </div>
                    <button className='button-trans'>
                        <span className="icon-sort sort-messages"></span>
                    </button>
                </div>
                {/* END HEADER NAV */}
                <div className='mess-body' ref={bodyMess}>
                    <div>
                        {timeMessages}

                    </div>

                    <div className='render-recieve-message'>
                        {/* <img
                            src={
                                "./images/avatar/_0008_Alina Baikova.jpg"
                            }
                            className="recieve-avatar"
                        /> */}
                        <div>
                            {/* {RenderRecievemessage()} */}
                        </div>

                    </div>
                    <div className='render-message'>
                        {/* {RenderSendmessage()} */}
                    </div>
                    {
                        userInfo.id ? renderMessages() : (() => { })()
                    }
                </div>
                <div className='input-messages-container'>
                    <div className='input-message'>
                        <img
                            src={"/images/avatar/_0010_user.jpg"}
                            className="comment-avatar"
                        />
                        <div
                            className='input-comment-with-icon'>
                            <button className='arrow-next-button post-comment-button' onClick={sendMessage}>
                                <img
                                    src={"/images/icon/arrow-next.svg"}
                                    className="arrow-next-mess"
                                />
                            </button>
                            <textarea
                                type='text'
                                cols='3'
                                row='3'
                                placeholder='Write a comment...'
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                // onKeyDown={onEnterPress}
                            />
                        </div>
                    </div>
                    <hr className='bottom-border-message-detail' align='center' />
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});
export default connect(mapStateToProps, mapDispatchToProps)(MessagesDetail);
