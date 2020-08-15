import React from "react";

import { Link } from 'react-router-dom';
import {
    selectUserInfo
} from "modules/auth/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import moment from "moment";
import './Mess.scss';
import { GET_IMAGE } from "../../../../constants";
import UserAvatar from "react-user-avatar";

const MessagesComponent = props => {

    const { data, userInfo } = props;

    const renderMessage = () => {
        return _.map(data, ({ id, user, user_to, content, created_at }) => {
            return (
                <div key={`message ${id} ${user.id}`}>
                    <div className='message-preview-container' onClick={() => props.openWindow(user.id === userInfo.id ? user_to : user,)}>
                        <div className='message-component-container'>
                            {
                                user.id === userInfo.id ? user_to.personal_photo ?
                                    <img
                                        src={GET_IMAGE(user_to.personal_photo)}
                                        className="mess-avatar"
                                    /> :
                                    <UserAvatar size="42" name={user_to.first_name} />:
                                    user.personal_photo ?
                                    <img
                                        src={GET_IMAGE(user.personal_photo)}
                                        className="mess-avatar"
                                    /> :
                                    <UserAvatar size="42" name={user.first_name} />
                            }
                            <div className="info-user mess-content-container">
                                <p className='username'>
                                    {
                                        user.id === userInfo.id ?
                                            `${user_to.first_name}` :
                                            `${user.first_name}`
                                    }
                                </p>
                                <p className='mess-content'>{content}</p>
                            </div>
                        </div>
                        <p className='mess-hours-ago'>
                            {
                                moment(created_at).add(-(new Date().getTimezoneOffset() / 60), 'hours').fromNow()
                            }
                        </p>

                    </div>
                    <hr className='mess-border-bottom' />
                </div>

            );
        });
    }
    return (
        <div>
            {userInfo ? renderMessage() : () => { }}
        </div>
    )

};

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});
export default connect(mapStateToProps, mapDispatchToProps)(MessagesComponent);