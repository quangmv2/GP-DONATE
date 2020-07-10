import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import { FormattedMessage } from "react-intl";
import "./Post.scss";

const Post = ({ url, img, title, className, description }) => {
    return (
        <Link className={className ?? ""} to={url}>
            <div className="post-wrapper">
                <div className="post-image">
                    <img src={img} className="img-content" />
                </div>
                <div className="post-info-wrapper">
                    <h2>{title}</h2>
                    <div class="icon-line">
                        <i className="icon" />
                        <label>{description}</label>
                    </div>
                    <div class="icon-line">
                        <i className="icon" />
                        <label>{description}</label>
                    </div>
                </div>
            </div>
            {input}
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
