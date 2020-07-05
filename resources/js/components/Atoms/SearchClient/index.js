import { Input } from "antd";
import React, { PureComponent } from "react";
import Proptypes from "prop-types";
import { injectIntl } from "react-intl";
import "./search-client.scss";
import { isEqual } from "lodash";
export class SearchClient extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
    };
  }

  componentDidUpdate(prevProps) {
    const { searchKey } = this.props;
    if (!isEqual(prevProps.searchKey, searchKey)) {
      this.setState({
        searchKey,
      });
    }
  }

  onChangeSearch = (e) => {
    const { value } = e.target;
    this.setState(
      {
        searchKey: value,
      },
      () => this.searchData(value)
    );
  };

  searchData = (searchKey) => {
    const { onFieldChange, data, column, multi } = this.props;
    const filtered = (data || []).filter((item) => {
      if (multi) {
        const threeSome = (column || []).some(
          (e) =>
            item[e] &&
            item[e]
              .trim()
              .toLowerCase()
              .indexOf(searchKey.trim().toLowerCase()) !== -1
        );
        return threeSome;
      } else {
        return (
          item[column] &&
          item[column]
            .trim()
            .toLowerCase()
            .indexOf(searchKey.trim().toLowerCase()) !== -1
        );
      }
    });
    onFieldChange && onFieldChange(filtered, searchKey);
  };

  render() {
    const { placeholder, intl, name } = this.props;
    const placeholderIntl =
      placeholder &&
      intl.formatMessage({
        id: placeholder,
      });
    return (
      <Input
        className="client-search--input"
        data-test={`search_${name || ""}`}
        maxLength={200}
        onChange={this.onChangeSearch}
        placeholder={placeholderIntl}
        value={this.state.searchKey}
      />
    );
  }
}
SearchClient.defaultProps = {
  column: "name",
  data: [],
  placeholder: "enter_text",
  multi: false,
  onFieldChange: () => {},
  searchKey: "",
};
SearchClient.propTypes = {
  data: Proptypes.array.isRequired,
  column: Proptypes.any,
  placeholder: Proptypes.string,
  onFieldChange: Proptypes.func,
  searchKey: Proptypes.string,
  intl: Proptypes.any,
  multi: Proptypes.bool,
};
export default injectIntl(SearchClient);
