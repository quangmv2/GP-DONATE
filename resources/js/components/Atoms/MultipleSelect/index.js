import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./multiple-select.scss";

import { Select, Form } from "antd";
import { FormattedMessage } from "react-intl";

const { Option } = Select;

class MultipleSelect extends PureComponent {
  handleOnChange = (value) => {
    const { onChangeValue, isValue, name, options } = this.props;
    if (isValue) {
      onChangeValue && onChangeValue({ name, value });
    } else {
      onChangeValue && onChangeValue({ name, value: options });
    }
  };

  render() {
    const {
      placeholder,
      name,
      label,
      isRequired,
      errorMessage,
      options,
      selected,
    } = this.props;

    return (
      <div className="wrapper-input-custom">
        <Form.Item
          autocomplete="off"
          className="form-item-custom"
          colon={false}
          help={
            errorMessage && (
              <span className="error-message">{errorMessage}</span>
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
          validateStatus={errorMessage && "error"}
        >
          <Select
            className="multiple_select_custom"
            data-test={`select_multi_${name || ""}`}
            filterOption={(inputValue, option) =>
              option.props.children
                .toLowerCase()
                .includes(inputValue.toLowerCase())
            }
            mode="multiple"
            onChange={this.handleOnChange}
            placeholder={placeholder}
            value={selected}
          >
            {options.map((item) => {
              return (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  onChangeValue: PropTypes.func.isRequired,
  isValue: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  selected: PropTypes.array,
};

MultipleSelect.defaultProps = {
  options: [],
  selected: [],
};

export default MultipleSelect;
