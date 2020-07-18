import React from "react";
import "./Partron.scss";
import UserItem from "../UserItem";

const Patron = ({ data }) => {
    const renderData = () => {
        return _.map(data, ({ username, content, avatar, isFriend }) => {
            return (
                <UserItem
                    username={username}
                    content={content}
                    avatar={avatar}
                    isFriend={isFriend}
                    isSearchUser={true}
                    bordered={false}
                />
            );
        });
    };
    return <div>{renderData()}</div>;
};
export default Patron;
