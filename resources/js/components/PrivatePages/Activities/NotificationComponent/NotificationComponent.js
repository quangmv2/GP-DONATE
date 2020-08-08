import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GET_IMAGE, UN_FOLLOW_USER, FOLLOW_USER, CHECK_FOLLOW } from "../../../../constants";
import moment from "moment";
import UserAvatar from "react-user-avatar";
import "./Noti.scss";
import { fetchService } from "services";

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

            const [isFr, setIsFr] = useState(false);

            useEffect(() => {
                if (type == "follow") checkIsFrend(user.id);
            }, []);

            const checkIsFrend = async (id) => {
                const [data, status] = await fetchService.fetch(CHECK_FOLLOW(user.id), {
                    method: "GET"
                });

                if (status == 200) {
                    setIsFr(data.status);
                }
            }

            const follow = async () => {
                if (isFr) {
                    const [_, status] = await fetchService.fetch(UN_FOLLOW_USER(user.id), {
                        method: "DELETE"
                    });
                    if (status == 200) {
                        setIsFr(false);
                        return;
                    }
                }
                const [_, status] = await fetchService.fetch(FOLLOW_USER(user.id), {
                    method: "PUT"
                });
                if (status == 200) {
                    setIsFr(true);
                    return;
                }
            }
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
                                <p className="username">{`${user.first_name}`}</p>
                                <p className="mess-content">
                                    {
                                        type == "comment" ?
                                            `commented: ${data.content.split(' ').length > 10 ? data.content.split(' ').slice(9).join(' ') : data.content}...` :
                                            type == "follow" ?
                                                `started following you.` :
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
                        {type == "follow" && isFr ?
                            <span className="icon-account-active" onClick={follow}>
                                <span className="path1"></span>
                                <span className="path2"></span>
                            </span>
                            : <></>}

                        {type == "follow" && !isFr ?
                            <span className="icon-follow icon-follow-noti" onClick={follow}></span>
                            : <></>}
                    </Link>
                    <hr className="mess-border-bottom" />
                </div>
            );
        });
    };
    return <div>{renderNotification()}</div>;
};
export default NotificationComponent;
