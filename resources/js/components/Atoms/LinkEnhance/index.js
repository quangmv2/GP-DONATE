import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Badge from "../Badge";
import Proptypes from "prop-types";
import { FormattedMessage } from "react-intl";
import "./link-enhance.scss";
class LinkEnhance extends PureComponent {
  checkShowBadge = () => {
    const { showBadgeCount, badeValue } = this.props;
    if (showBadgeCount && badeValue) {
      return <Badge className="ml-10" value={badeValue} />;
    }
  };

  render() {
    const { url, title, className } = this.props;
    return (
      <Link className={className ?? ""} to={url}>
        <FormattedMessage defaultMessage="Default message" id={title} />
        {this.checkShowBadge()}
      </Link>
    );
  }
}
LinkEnhance.propTypes = {
  url: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
  showBadgeCount: Proptypes.bool,
  badeValue: Proptypes.number,
};

LinkEnhance.defaultProps = {
  showBadgeCount: false,
  badeValue: 0,
};

export default LinkEnhance;
