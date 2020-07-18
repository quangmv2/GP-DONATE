import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Badge from "../Badge";
import Proptypes from "prop-types";
import { FormattedMessage } from "react-intl";
import "./link-edit.scss";

class LinkEdit extends PureComponent {
    render() {
        const { url, title, className, icon } = this.props;
        return (
            <Link className={className ?? ""} to={url}>
                <FormattedMessage defaultMessage={title} id={title} />

                <div>{icon}</div>
            </Link>
        );
    }
}
LinkEdit.propTypes = {
    url: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    showBadgeCount: Proptypes.bool,
    badeValue: Proptypes.number
};

LinkEdit.defaultProps = {
    showBadgeCount: false,
    badeValue: 0
};

export default LinkEdit;
