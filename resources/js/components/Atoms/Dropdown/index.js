import React, { PureComponent } from "react";
import cn from "classnames";
import { PropTypes } from "prop-types";
import { find } from "lodash";
import "./dropdown.scss";

class DropDown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
      selectedOption: find(props.options, { value: props.value }),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        selectedOption: find(this.props.options, { value: this.props.value }),
      });
    }
  }

  toggleDropdown = () => {
    const { disabled } = this.props;
    const { showOptions } = this.state;
    if (!disabled) {
      this.setState({
        showOptions: !showOptions,
      });
    }
  };

  onClickOption = (option) => {
    const { onChange } = this.props;
    this.setState({
      selectedOption: option,
      showOptions: false,
    });
    onChange({ ...this.props, ...option });
  };

  renderOptions = () => {
    const { options } = this.props;
    const { showOptions } = this.state;

    const hasOptions = options && options.length;

    return (
      <div
        className="options-wrapper"
        style={{ display: showOptions ? "block" : "none" }}
      >
        <ul className="option-list">
          {hasOptions &&
            options.map((option) => (
              <li
                className="option-item"
                dangerouslySetInnerHTML={{
                  __html: option.labelHtml ? option.labelHtml : option.label,
                }}
                key={option.value}
                onClick={() => this.onClickOption(option)}
              />
            ))}
        </ul>
      </div>
    );
  };

  render() {
    const { selectedOption } = this.state;
    const { label } = selectedOption || {};
    const { disabled, name } = this.props;
    return (
      <div className={cn("dropdown")}>
        <div
          className={cn("toggle-button", disabled ? "dropdown-disabled" : "")}
          data-test={`dropdown_${name}`}
          onClick={this.toggleDropdown}
        >
          <span className="value-text">{label || "Select a option"}</span>
        </div>
        {this.renderOptions()}
      </div>
    );
  }
}

DropDown.defaultProps = {
  showIconDropDown: true,
  options: [],
  value: null,
  onChange: () => ({}),
  name: "",
};

DropDown.propTypes = {
  showIconDropDown: PropTypes.bool,
  options: PropTypes.any,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

export default DropDown;
