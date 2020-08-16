import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from 'react-router-dom';
import { fetchService } from "services";
import { GET_MESSAGE_DETAILS, SEND_MESSAGE, GET_IMAGE } from "../../../../constants";
import {
    selectUserInfo
} from "modules/auth/selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import UserAvatar from "react-user-avatar";
import { NavigatorContext } from "../../../../context/BottomNavigatorContextAPI";

import './MessageDetail.scss';
import "../../Home/HomeScreen.scss";


const MessagesDetail = props => {

    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const { setShowNavigator } = useContext(NavigatorContext);
    const bodyMess = useRef();

    useEffect(() => {
        getFirst();
        setShowNavigator(false);
        return () => setShowNavigator(true);
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
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className='private-fullheight' style={{ position: "absolute", zIndex: 10000, width: "100%" }}>
            <div className='container'>
                <div className="header-wrapper header-comment-profile">
                    <div className="top-navbar-giver-home message-top-nav" style={{backgroundColor: "#081f47"}}>
                        <div className="navbar-giver-home-container navbar-message-container">
                            <button className='button-trans' onClick={props.closeWindow}>
                                <span className="icon-back back-messages"></span>
                            </button>
                            <Link to="/user-profile">

                                {
                                    props.data && props.data.personal_photo ?
                                        <img
                                            src={GET_IMAGE(props.data.personal_photo)}
                                            className="giver-avatar"
                                        />:
                                    <UserAvatar size="42" name={props.data.first_name} />
                                }


                            </Link>
                            <div className="info-user">
                                <p className="username">
                                    <Link to="/user-profile">
                                        {`${props.data.first_name}`}
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
                </div>
                {/* END HEADER NAV */}
                <div className='mess-body' ref={bodyMess}>
                    <div className='render-recieve-message'>
                        <div>
                        </div>
                    </div>
                    <div className='render-message'>
                    </div>
                    {
                        userInfo.id ? renderMessages() : (() => { })()
                    }
                </div>
                <div className='input-messages-container'>
                    <div className='input-message'>
                        {
                            userInfo && userInfo.personal_photo ?
                                <img
                                    src={GET_IMAGE(userInfo.personal_photo)}
                                    className="giver-avatar"
                                />:
                            <UserAvatar size="42" name={userInfo.first_name} />
                        }
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
                                placeholder='Write a message...'
                                value={input}
                                onChange={e => setInput(e.target.value)}
                            />
                        </div>
                    </div>
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
