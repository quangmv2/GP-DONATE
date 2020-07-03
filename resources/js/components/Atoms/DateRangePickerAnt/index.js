import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { DatePicker } from "antd";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import { DATE_FORMAT_FOR_SHOW } from ".././../../constants";
import { Form } from "antd";
import "./date-ranger-picker-ant.scss";
const { RangePicker } = DatePicker;

export const DateRangePickerAnt = ({
  label,
  disabled,
  value,
  onChange,
  placeholder,
  allowClear,
  intl,
  name,
  disabledDate,
}) => {
  const handleChangeDate = (dateRange) => {
    const [startDate, endDate] = dateRange || [];
    if (startDate && endDate) {
      const endDateParse = endDate.format("YYYY-MM-DD") + " 23:59";
      onChange([
        startDate ? moment(startDate).utc().toISOString() : "",
        endDate ? moment(endDateParse).utc().toISOString() : "",
      ]);
    } else {
      onChange(dateRange);
    }
  };

  const placeholderIntl = [
    intl.formatMessage({
      id: placeholder[0],
      defaultMessage: "Default message",
    }),
    intl.formatMessage({
      id: placeholder[1],
      defaultMessage: "Default message",
    }),
  ];

  const [startDate, endDate] = value;
  const rangDateValue =
    startDate && endDate ? [moment(startDate), moment(endDate)] : [];
  return (
    <div className="wrapper-date-range-picker-custom mb-30">
      <Form.Item
        className="form-item-custom"
        label={
          label ? (
            <FormattedMessage defaultMessage="Default message" id={label} />
          ) : (
            ""
          )
        }
      >
        <RangePicker
          allowClear={allowClear}
          className="ant-date-range-custom"
          data-test={`range_picker_${name}`}
          disabled={disabled}
          disabledDate={disabledDate}
          format={DATE_FORMAT_FOR_SHOW}
          onChange={handleChangeDate}
          placeholder={placeholderIntl}
          size="large"
          value={rangDateValue}
        />
      </Form.Item>
    </div>
  );
};

DateRangePickerAnt.defaultProps = {
  label: "",
  disabled: false,
  value: ["2019-10-18", "2019-10-30"],
  placeholder: ["from", "to"],
  allowClear: false,
  name: "",
  disabledDate: () => {},
  onChange: () => {},
};

DateRangePickerAnt.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.array,
  intl: PropTypes.any,
  allowClear: PropTypes.bool,
  name: PropTypes.string,
  disabledDate: PropTypes.func,
};

export default injectIntl(DateRangePickerAnt);
