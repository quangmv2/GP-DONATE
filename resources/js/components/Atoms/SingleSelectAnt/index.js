import React, { createRef } from "react";
import PropTypes from "prop-types";
import { Select, Form, Tooltip } from "antd";
import { injectIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import "./single-select-ant.scss";
import cn from "classnames";
import { getModalContainer } from "helpers";

const { Option } = Select;

const selectRef = createRef();

const SingleSelectAnt = ({
  showSearch,
  disabled,
  option,
  name,
  value,
  placeholder,
  labelProp,
  keyProp,
  label,
  onSearch,
  onBlur,
  onFocus,
  onChange,
  intl,
  nullOption,
  isRequired,
  error,
  errorMessage,
  isTranslateOption,
  className,
  allowClear,
  disabledDefault,
}) => {
  const placeholderIntl =
    placeholder &&
    intl.formatMessage({ id: placeholder, defaultMessage: "All" });

  const getPopupContainer = () => {
    const selectEl = selectRef.current.rcSelect.selectionRef;

    return getModalContainer(selectEl);
  };

  return (
    <div className={cn("wrapper-input-custom", className)}>
      <Form.Item
        className="form-item-custom"
        colon={false}
        help={
          errorMessage && <span className="error-message">{errorMessage}</span>
        }
        label={
          label ? (
            <span>
              <FormattedMessage defaultMessage="Default message" id={label} />
              {isRequired && <span className="field--required">*</span>}
            </span>
          ) : (
            ""
          )
        }
        validateStatus={errorMessage && "error"}
      >
        <Select
          allowClear={allowClear}
          className={`select-custom${error ? " select--errored" : ""}`}
          data-test={`input_${name}`}
          disabled={disabled}
          getPopupContainer={getPopupContainer}
          onBlur={onBlur}
          onChange={(selectValue) => onChange({ name, value: selectValue })}
          onFocus={onFocus}
          onSearch={onSearch}
          placeholder={placeholderIntl}
          ref={selectRef}
          showSearch={showSearch}
          value={value}
        >
          {!disabledDefault && (
            <Option disabled={!nullOption} value="">
              {placeholderIntl}
            </Option>
          )}
          {(option || []).map((item) => {
            return (
              <Option
                disabled={item.disabled}
                key={item[keyProp]}
                value={item[keyProp]}
              >
                <Tooltip title={item[labelProp]}>
                  <span className="select-item-custom">
                    {isTranslateOption ? (
                      <FormattedMessage
                        defaultMessage="default"
                        id={item[labelProp]}
                      />
                    ) : (
                      item[labelProp]
                    )}
                  </span>
                </Tooltip>
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </div>
  );
};

SingleSelectAnt.defaultProps = {
  showSearch: false,
  onChange: () => null,
  option: [{ label: "display name", value: "display_name" }],
  onBlur: () => null,
  onSearch: () => null,
  onFocus: () => null,
  name: "",
  labelProp: "label",
  keyProp: "value",
  placeholder: "select",
  disabled: false,
  nullOption: false,
  errorMessage: "",
  isTranslateOption: false,
  className: "",
  allowClear: false,
};

SingleSelectAnt.propTypes = {
  showSearch: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  option: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  labelProp: PropTypes.string,
  keyProp: PropTypes.string,
  onSearch: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  intl: PropTypes.any,
  nullOption: PropTypes.bool,
  error: PropTypes.bool,
  isRequired: PropTypes.bool,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  allowClear: PropTypes.bool,
};

export default injectIntl(SingleSelectAnt);
