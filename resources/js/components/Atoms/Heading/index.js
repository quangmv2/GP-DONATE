import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";
import cn from "classnames";
import "./heading.scss";

export class Heading extends Component {
  render() {
    const {
      className,
      title,
      subtitle,
      center,
      isTranslation,
      defaultTitle,
      defaultSubtitle,
    } = this.props;
    return (
      <div className={cn(className, center ? "text-center" : "")}>
        <div className="page__header">
          {title && (
            <h1 className="page__title">
              {isTranslation ? (
                <FormattedMessage defaultMessage={defaultTitle} id={title} />
              ) : (
                { title }
              )}
            </h1>
          )}

          {subtitle && (
            <div className="subtitle">
              {isTranslation ? (
                <FormattedMessage
                  defaultMessage={defaultSubtitle}
                  id={subtitle}
                />
              ) : (
                { subtitle }
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Heading.defaultProps = {
  center: false,
  className: "",
  title: "",
  subtitle: "",
  isTranslation: true,
};

Heading.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  center: PropTypes.bool,
  className: PropTypes.string,
  isTranslation: PropTypes.bool,
};

export default injectIntl(Heading);
