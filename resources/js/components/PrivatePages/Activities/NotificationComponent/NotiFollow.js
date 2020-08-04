import React from "react";

const NotiFollow = props => {

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

}

export default NotiFollow;