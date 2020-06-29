import React from "react";
import PropTypes from "prop-types";
import { DatePicker, Form } from "antd";
import { MONTH_PICKER_FORMAT } from ".././../../constants";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import cn from "classnames";
import "./month-picker-ant.scss";
const { MonthPicker } = DatePicker;

export const MonthPickerAnt = ({
  onChange,
  value,
  label,
  placeholder,
  name,
  className,
  intl,
  format,
  allowClear,
}) => {
  const placeholderIntl =
    placeholder && intl.formatMessage({ id: placeholder });
  const handleChangeDate = (date) => {
    onChange(date);
  };
  return (
    <Form.Item
      className={cn("form-month-picker-custom", className)}
      label={
        label && (
          <FormattedMessage defaultMessage="Default message" id={label} />
        )
      }
    >
      <MonthPicker
        allowClear={allowClear}
        className="month-picker-custom"
        data-test={`month_picker_${name}`}
        format={format}
        onChange={handleChangeDate}
        placeholder={placeholderIntl}
        size="large"
        value={value}
      />
    </Form.Item>
  );
};

MonthPickerAnt.defaultProps = {
  onChange: () => {},
  label: "",
  placeholder: "",
  name: "",
  className: "",
  format: MONTH_PICKER_FORMAT,
  allowClear: false,
};

MonthPickerAnt.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  format: PropTypes.string,
  allowClear: PropTypes.bool,
  intl: PropTypes.object,
};

export default injectIntl(MonthPickerAnt);
