import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Button } from "antd";
import { injectIntl } from "react-intl";
import cn from "classnames";
import "./button.scss";

export class ButtonAnt extends Component {
  render() {
    const {
      type,
      disabled,
      loading,
      children,
      icon,
      name,
      className,
      size,
      shape,
      block,
      onClick,
    } = this.props;

    return (
      <Button
        block={block}
        className={cn("wrapper-btn tripto-btn", className)}
        data-test={`button_${name}`}
        disabled={disabled}
        icon={icon}
        loading={loading}
        onClick={onClick}
        shape={shape}
        size={size}
        type={type}
      >
        {children}
      </Button>
    );
  }
}

ButtonAnt.defaultProps = {
  disabled: false,
  loading: false,
  onClick: () => ({}),
  name: "",
  className: "",
  title: "button",
};

ButtonAnt.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func,
  icon: PropTypes.any,
  margin: PropTypes.any,
  name: PropTypes.string,
  className: PropTypes.any,
  size: PropTypes.string,
  block: PropTypes.bool,
  shape: PropTypes.string,
  title: PropTypes.string,
  intl: PropTypes.any,
};

export default injectIntl(ButtonAnt);
