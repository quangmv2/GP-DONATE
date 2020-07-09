import React from "react";
import notiData from "./notiData";
import "./Noti.scss";
import { Link } from "react-router-dom";

const NotificationComponent = () => {
    let notiImage = <span className="icon-follow icon-follow-noti"></span>;
    let image = (
        <img
            src={"./images/avatar/_0008_Alina Baikova.jpg"}
            className="mess-avatar noti-image"
        />
    );
    const renderNotification = () => {
        return _.map(notiData, ({ username, content }) => {
            return (
                <>
                    <Link className="message-preview-container noti-preview-container">
                        <div className="message-component-container">
                            <img
                                src={"./images/avatar/_0008_Alina Baikova.jpg"}
                                className="mess-avatar"
                            />
                            <div className="info-user mess-content-container">
                                <p className="username">{username}</p>
                                <p className="mess-content">{content}</p>
                                <p className="mess-hours-ago noti-hours-ago">
                                    3 hours ago{" "}
                                </p>
                            </div>
                        </div>

                        {notiImage}
                    </Link>
                    <hr className="mess-border-bottom" />
                </>
            );
        });
    };
    return <div>{renderNotification()}</div>;
};
export default NotificationComponent;
