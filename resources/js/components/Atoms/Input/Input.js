import React from "react";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import cn from "classnames";
import PropTypes from "prop-types";
import { Input as InputAnt } from "antd";

import "./input.scss";
const TYPE_INPUT = {
  NUMBER: "number",
  TEXT_AREA: "text-area",
  TEXT: "text",
  PASSWORD: "password",
  EMAIL: "email",
};

const Input = ({
  label,
  value,
  errors,
  touched,
  onChange,
  onBlur,
  required,
  intl,
  placeholder,
  type,
  name,
  disabled,
  className,
}) => {
  const placeholderIntl =
    placeholder &&
    intl &&
    intl.formatMessage({ id: placeholder, defaultMessage: placeholder });
  return (
    <>
      {label && (
        <span>
          <FormattedMessage defaultMessage={label} id={label} />
          {required && <span className="field--required">*</span>}
        </span>
      )}
      {(type === TYPE_INPUT.TEXT || type === TYPE_INPUT.EMAIL) && (
        <InputAnt
          type={type}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholderIntl}
          disabled={disabled}
          required={required}
          className={cn(className, "tripto-input ant-input")}
        />
      )}

      {type === TYPE_INPUT.PASSWORD && (
        <InputAnt.Password
          type={type}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholderIntl}
          disabled={disabled}
          required={required}
          className={cn(className, "tripto-input ant-input")}
        />
      )}

      <div className="tripto-error-input">{errors && touched && errors}</div>
    </>
  );
};

Input.defaultProps = {
  label: null,
  placeholder: "",
  name: "name",
  disabled: false,
  type: "text",
  required: false,
  className: "",
};

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errors: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onPressEnter: PropTypes.func,
  intl: PropTypes.any,
  className: PropTypes.string,
};

export default injectIntl(Input);
