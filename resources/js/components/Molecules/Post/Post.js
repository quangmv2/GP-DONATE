import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import { FormattedMessage } from "react-intl";
import "./Post.scss";
import { GET_IMAGE } from "../../../constants/routes";
import UserAvatar from "react-user-avatar";

const Post = ({
    url,
    img,
    title,
    className,
    description,
    duedate,
    author,
    createTime,
    likeNumber
}) => {
    return (
        <Link className={className ?? ""} to={url}>
            <div className="post-wrapper">
                <div className="post-image">
                    <img src={img} className="img-content" />
                    <div className="wrapper-icon">
                        <button className="icon-button">
                            <i className="icon-comment-active" />
                        </button>
                        <button className="icon-button">
                            <i className="icon-like-active" />
                            <span>{likeNumber}</span>
                        </button>
                    </div>
                </div>
                <div className="post-info-wrapper">
                    <h2>{title}</h2>
                    <div className="icon-line">
                        <i className="icon-goods icon" />
                        <label>{description}</label>
                    </div>
                    <div className="icon-line">
                        <i className="icon-calendar-complete icon" />
                        <label className="content-icon">{duedate}</label>
                    </div>
                    <div className="author-create">
                        <div className="author-image">
                            {
                                author.avatar?<img src={GET_IMAGE(author.avatar)} className="img-user" />:
                                <UserAvatar size="42" name={`${author.username}`} />
                            }
                        </div>
                        <div className="post-create">
                            <h3>{author.username}</h3>
                            <span>{duedate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
Post.propTypes = {
    url: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    showBadgeCount: Proptypes.bool,
    badeValue: Proptypes.number
};

Post.defaultProps = {
    showBadgeCount: false,
    badeValue: 0
};

export default Post;
