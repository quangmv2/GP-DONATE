import React, { useState } from "react";
import "./UserItem.scss";
import { Link } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import { GET_IMAGE, UN_FOLLOW_USER, FOLLOW_USER } from "../../../constants/routes";
import UserAvatar from "react-user-avatar";
import { fetchService } from "services";

const UserItem = ({
    id,
    username,
    content,
    avatar,
    isCeleb = false,
    isFriend = false,
    bordered = true,
    time,
    isSearchUser = false
}) => {

    const [isFr, setIsFr] = useState(isFriend);

    const follow = async () => {
        if (isFr) {
            const [_, status] = await fetchService.fetch(UN_FOLLOW_USER(id), {
                method: "DELETE"
            });
            if (status == 200) {
                setIsFr(false);
                return;
            }
        }
        const [_, status] = await fetchService.fetch(FOLLOW_USER(id), {
            method: "PUT"
        });
        if (status == 200) {
            setIsFr(true);
            return;
        }
    }

    console.log(isCeleb);

    return (
        <div style={{ display: "flex" }}>
            <Link className="message-component-container message-preview-container" to="#">
                <div className="message-component-container">
                    <div className="avatar-wrapper">
                        {
                            isCeleb?<StarFilled className="icon-star" />:<></>
                        }
                        {
                            avatar ? <img src={GET_IMAGE(avatar)} className="mess-avatar" /> :
                                <UserAvatar size="42" name={`${username}`} />
                        }
                    </div>
                    <div className="info-user mess-content-container">
                        <p className="username">{username}</p>
                        <p className="mess-content">{content}</p>
                    </div>
                </div>
                <div className="icon-time-wrapper">
                    {isFr & isSearchUser ? (
                        <span className="icon-account-active" onClick={follow}>
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </span>
                    ) : <span className="icon-follow icon-follow-noti" onClick={follow}></span>}
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
