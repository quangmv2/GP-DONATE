import React, { Component } from "react";
import { Checkbox } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import "./checkbox.scss";
class CheckBoxCustom extends Component {
  render() {
    const {
      isRequire,
      label,
      checked,
      onChange,
      name,
      isInline,
      valueMessage,
      disabled,
    } = this.props;

    return (
      <div
        className={`form--input_control input_inline ${
          isInline ? "form__checkbox--inline" : ""
        }`}
      >
        <div className="form--input_control">
          <Checkbox
            checked={checked}
            data-test={`checkbox_${name}`}
            disabled={disabled}
            onChange={(event) => onChange(event.target.checked)}
          >
            <label className="form--label_control">
              <FormattedMessage
                defaultMessage="Default message"
                id={label}
                values={valueMessage}
              />
              {isRequire && "*"}
            </label>
          </Checkbox>
        </div>
      </div>
    );
  }
}

CheckBoxCustom.defaultProps = {
  onChange: () => ({}),
  label: "label",
  isInline: false,
  isRequire: false,
  checked: false,
  name: "",
  valueMessage: {},
  disabled: false,
};

CheckBoxCustom.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string,
  isRequire: PropTypes.bool,
  name: PropTypes.string,
  isInline: PropTypes.bool,
  valueMessage: PropTypes.object,
  disabled: PropTypes.bool,
};

export default CheckBoxCustom;
