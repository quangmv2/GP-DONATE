import React from "react";
import "./UserItem.scss";
import { Link } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";

const UserItem = ({
    username,
    content,
    avatar,
    isCeleb = false,
    isFriend = false,
    bordered = true,
    time,
    isSearchUser = false
}) => {
    console.log(bordered);

    return (
        <div>
            <Link className="message-component-container message-preview-container">
                <div className="message-component-container">
                    <div className="avatar-wrapper">
                        <img src={avatar} className="mess-avatar" />
                        <StarFilled className="icon-star" />
                    </div>
                    <div className="info-user mess-content-container">
                        <p className="username">{username}</p>
                        <p className="mess-content">{content}</p>
                    </div>
                </div>
                <div className="icon-time-wrapper">
                    {isFriend & isSearchUser ? (
                        <span className="icon-account-active">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </span>
                    ) : null}
                    {!isSearchUser && time ? (
                        <p className="mess-hours-ago">{time} </p>
                    ) : null}
                </div>
            </Link>
            {bordered && <hr className="mess-border-bottom" />}
        </div>
    );
};
export default UserItem;
