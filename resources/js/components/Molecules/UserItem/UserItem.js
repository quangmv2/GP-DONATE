import React from "react";
import "./UserItem.scss";
import { Link } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import { GET_IMAGE } from "../../../constants/routes";
import UserAvatar from "react-user-avatar";

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
            <Link className="message-component-container message-preview-container" to="#">
                <div className="message-component-container">
                    <div className="avatar-wrapper">
                            {
                                avatar?<img src={GET_IMAGE(avatar)} className="mess-avatar" />:
                                <UserAvatar size="42" name={`${username}`} />
                            }
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
