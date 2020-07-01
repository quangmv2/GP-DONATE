import React, { createRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { DatePicker, Form } from "antd";
import { DATE_FORMAT_FOR_SHOW } from "constants";
import { FormattedMessage } from "react-intl";
import { getModalContainer, isValid } from "helpers";

import "./data-picker-ant.scss";

const datePickerRef = createRef();

const DatePickerAnt = ({
  onChange,
  value,
  label,
  isRequired,
  disabled,
  errorMessage,
  name,
  showTime,
  disabledDate,
  showFormat,
  disabledTime,
}) => {
  const getPopupContainer = () => {
    const datePickerEl = datePickerRef.current.picker.input;
    return getModalContainer(datePickerEl);
  };

  return (
    <div className="wrapper-input-custom">
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
        <DatePicker
          allowClear={false}
          className="ant-datepicker-custom"
          data-test={`date_picker_${name}`}
          disabled={disabled}
          disabledDate={disabledDate}
          disabledTime={disabledTime}
          format={showFormat || DATE_FORMAT_FOR_SHOW}
          getCalendarContainer={getPopupContainer}
          onChange={(date) => {
            if (isValid(date)) {
              const diff = date.diff(moment());
              const isToday = diff <= 0 && diff > -5 ? true : false;
              !showTime &&
                (date =
                  moment(date).format("MM-DD-YYYY") +
                  " " +
                  moment().format("HH:mm:ss"));
              onChange(moment(date).utc().toISOString(), isToday);
            } else {
              onChange("");
            }
          }}
          ref={datePickerRef}
          showTime={showTime}
          value={value ? moment(value) : ""}
        />
      </Form.Item>
    </div>
  );
};

DatePickerAnt.defaultProps = {
  isRequired: false,
  disabled: false,
  errorMessage: "",
  name: "",
  disabledDate: () => {},
  disabledTime: () => {},
  onChange: () => {},
};

DatePickerAnt.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  name: PropTypes.string,
  disabledDate: PropTypes.func,
  showTime: PropTypes.bool,
  disabledTime: PropTypes.func,
};

export default DatePickerAnt;
