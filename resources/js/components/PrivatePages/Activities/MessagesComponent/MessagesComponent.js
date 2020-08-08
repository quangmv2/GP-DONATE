import React from "react";

import { Link } from 'react-router-dom';
import {
    selectUserInfo
} from "modules/auth/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import moment from "moment";
import './Mess.scss';

const MessagesComponent = props => {

    const { data, userInfo } = props;

    const renderMessage = () => {
        return _.map(data, ({ id, user, user_to, content, created_at }) => {
            return (
                <div key={`message ${id} ${user.id}`}>
                    <div className='message-preview-container' onClick={() => props.openWindow(user.id === userInfo.id?user_to:user, )}>
                        <div className='message-component-container'>
                            <img
                                src={"./images/avatar/_0008_Alina Baikova.jpg"}
                                className="mess-avatar"
                            />
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