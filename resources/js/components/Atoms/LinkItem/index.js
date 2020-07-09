import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Badge from "../Badge";
import Proptypes from "prop-types";
import { FormattedMessage } from "react-intl";
import "./link-item.scss";

class LinkItem extends PureComponent {
    render() {
        const { url, title, className, icon, arrow } = this.props;
        return (
            <Link className={className ?? ""} to={url}>
                <div>
                    {icon}
                    <FormattedMessage defaultMessage={title} id={title} />
                </div>
                {arrow}
            </Link>
        );
    }
}
LinkItem.propTypes = {
    url: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    showBadgeCount: Proptypes.bool,
    badeValue: Proptypes.number
};

LinkItem.defaultProps = {
    showBadgeCount: false,
    badeValue: 0
};

export default LinkItem;
