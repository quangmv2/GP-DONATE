import React from "react";
import { Input, InputNumber, Form, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import cn from "classnames";
import {
  removeSpecialCharacter,
  removeHtmlTag,
  checkNumberFieldLength,
} from "helpers";
import PropTypes from "prop-types";
import "./input-ant.scss";
import { TooltipAnt } from "../TooltipAnt";

const TYPE_INPUT = {
  NUMBER: "number",
  TEXT_AREA: "text-area",
  TEXT: "text",
  PASSWORD: "password",
};

const VALIDATE_STATUS = {
  ERROR: "error",
  WARNING: "warning",
  SUCCESS: "success",
};

export const InputAnt = ({
  placeholder,
  disabled,
  name,
  type,
  value,
  label,
  error,
  errorMessage,
  disabledSpecialCharacter,
  onChange,
  onPressEnter,
  isRequired,
  intl,
  suffix,
  className,
  maxLength,
  visibilityToggle,
}) => {
  const handleOnchange = (event) => {
    let valueNew = type === TYPE_INPUT.NUMBER ? event : event.target.value;
    // Remove special character
    if (disabledSpecialCharacter) {
      valueNew = removeSpecialCharacter(valueNew);
    }
    // Remove tag html
    if (type === TYPE_INPUT.TEXT) {
      valueNew = removeHtmlTag(valueNew);
    }
    onChange({ name, value: valueNew });
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      onPressEnter && onPressEnter(e);
    }
  };

  const placeholderIntl =
    placeholder &&
    intl &&
    intl.formatMessage({ id: placeholder, defaultMessage: placeholder });

  return (
    <div className="wrapper-input-custom">
      <Form.Item
        className={cn("form-item-custom", error ? "error" : "")}
        colon={false}
        help={
          errorMessage && (
            <Tooltip title={errorMessage}>
              <span className="error-message">{errorMessage}</span>
            </Tooltip>
          )
        }
        label={
          label ? (
            <span>
              <FormattedMessage defaultMessage="Default message" id={label} />
              {isRequired && <span className="field--required">*</span>}
            </span>
          ) : null
        }
        validateStatus={errorMessage && VALIDATE_STATUS.ERROR}
      >
        <TooltipAnt title={label ? null : errorMessage}>
          {type === TYPE_INPUT.TEXT && (
            <Input
              className={`${className} input-custom`}
              data-test={`input_${name}`}
              disabled={disabled}
              maxLength={maxLength ? maxLength : 200}
              name={name}
              onChange={handleOnchange}
              onKeyDown={handleKeyPress}
              placeholder={placeholderIntl}
              suffix={suffix}
              value={value}
            />
          )}
          {type === TYPE_INPUT.PASSWORD && (
            <Input.Password
              autoComplete="new-password"
              className={`${className} input-custom`}
              data-test={`input_${name}`}
              disabled={disabled}
              id={`input_${name}`}
              onChange={handleOnchange}
              onKeyDown={handleKeyPress}
              placeholder={placeholderIntl}
              value={value}
              visibilityToggle={
                visibilityToggle === false ? visibilityToggle : true
              }
            />
          )}
          {type === TYPE_INPUT.NUMBER && (
            <InputNumber
              className={`${className} input-custom`}
              data-test={`input_${name}`}
              disabled={disabled}
              max={9999}
              min={1}
              onChange={handleOnchange}
              onInput={checkNumberFieldLength}
              placeholder={placeholderIntl}
              value={value}
            />
          )}
          {type === TYPE_INPUT.TEXT_AREA && (
            <Input.TextArea
              className={`${className} text-area-custom`}
              data-test={`input_${name}`}
              disabled={disabled}
              maxLength={maxLength ? maxLength : 1000}
              name={name}
              onChange={handleOnchange}
              onKeyDown={handleKeyPress}
              placeholder={placeholderIntl}
              value={value}
            />
          )}
        </TooltipAnt>
      </Form.Item>
    </div>
  );
};

InputAnt.defaultProps = {
  label: null,
  placeholder: "enter_text",
  name: "name",
  disabled: false,
  type: TYPE_INPUT.TEXT,
  disabledSpecialCharacter: false,
  isRequired: false,
  className: "",
};

InputAnt.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  disabledSpecialCharacter: PropTypes.bool,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  intl: PropTypes.any,
  className: PropTypes.string,
  visibilityToggle: PropTypes.bool,
};

export default injectIntl(InputAnt);
