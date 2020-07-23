import React from "react";
import notiData from "./notiData";
import "./Noti.scss";
import { Link } from "react-router-dom";
import { GET_IMAGE } from "../../../../constants";
import moment from "moment";
import UserAvatar from "react-user-avatar";

const NotificationComponent = props => {

    const { data } = props;

    let notiImage = <span className="icon-follow icon-follow-noti"></span>;
    let image = (
        <img
            src={"./images/avatar/_0008_Alina Baikova.jpg"}
            className="mess-avatar noti-image"
        />
    );

    const renderNotification = () => {
        return _.map(data, ({ id, user_to, user, type, data: obj, created_at }) => {

            const data = JSON.parse(obj);

            return (
                <div key={`noti ${id} ${user.id}`}>
                    <Link className="message-preview-container noti-preview-container">
                        <div className="message-component-container">
                            {
                                user.personal_photo ? <img
                                    src={GET_IMAGE(user.personal_photo)}
                                    className="mess-avatar"
                                /> :
                                    <UserAvatar size="42" name={`${user.first_name}`} />
                            }
                            <div className="info-user mess-content-container">
                                <p className="username">{`${user.first_name} ${user.last_name}`}</p>
                                <p className="mess-content">
                                    {
                                        type=="comment"?
                                        `commented: ${ data.content.split(' ').length>10?data.content.split(' ').slice(9).join(' '):data.content.split(' ')}...`:
                                        type=="follow"?
                                        `started following you.`:
                                        `liked your project`
                                    }
                                </p>
                                <p className="mess-hours-ago noti-hours-ago">
                                    {
                                        moment(created_at).add(-(new Date().getTimezoneOffset() / 60), 'hours').fromNow()
                                    }
                                </p>
                            </div>
                        </div>
                        {type=="follow"?notiImage:<></>}
                    </Link>
                    <hr className="mess-border-bottom" />
                </div>
            );
        });
    };
    return <div>{renderNotification()}</div>;
};
export default NotificationComponent;
