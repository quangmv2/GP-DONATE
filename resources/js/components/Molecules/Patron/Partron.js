import React from "react";
import "./Partron.scss";
import UserItem from "../UserItem";

const Patron = ({ data }) => {
    const renderData = () => {
        return _.map(data, ({ username, content, avatar, isFriend }, index) => {
            return (
                <UserItem
                    username={username}
                    content={content}
                    avatar={avatar}
                    isFriend={isFriend}
                    isSearchUser={true}
                    bordered={false}
                    key={`search parton ${index}`}
                />
            );
        });
    };
    return <div>{renderData()}</div>;
};
export default Patron;
