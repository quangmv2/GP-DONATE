import React from "react";
import { Table } from "antd";
import PropTypes from "prop-types";

import uuid from "uuid/v4";
import isEqual from "lodash-es/isEqual";
import { PAGE_SIZE_DEFAULT } from "constants";
import { Radio, Form } from "antd";

import "./datatable.scss";

export class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnded: false,
      selectedRowKeys: [],
      pageSiteDefault: this.props.pageSiteDefault ?? PAGE_SIZE_DEFAULT,
      currentPage: 1,
      loading: true,
      size: "small",
    };

    this.idTable = uuid();
  }

  async componentDidMount() {
    const { fetchFn } = this.props;
    let { currentPage, isEnded } = this.state;
    if (fetchFn) {
      this.fetchData();
    }

    //setup listen scroll function
    // setTimeout to wait table render all class
    setTimeout(() => {
      const wrapper = document.getElementById(this.idTable);
      if (wrapper) {
        let tableContent = wrapper.querySelector(".ant-table-body");
        if (tableContent) {
          tableContent.addEventListener("scroll", (event) => {
            if (isEnded) return;
            let maxScroll =
              event.target.scrollHeight - event.target.clientHeight;
            let currentScroll = Math.round(event.target.scrollTop);

            if (currentScroll === maxScroll && currentPage <= 5) {
              // load more data
              this.fetchData();
            } else {
              this.setState({ isEnded: true });
            }
          });
        }
      }
    }, 2000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = false;
    const { size } = this.state;
    if (
      !isEqual(
        nextProps.tableProps.dataSource,
        this.props.tableProps.dataSource
      ) ||
      !isEqual(nextProps.tableProps.loading, this.props.tableProps.loading) ||
      !isEqual(nextProps.tableProps.scroll, this.props.tableProps.scroll)
    ) {
      shouldUpdate = true;
    }
    if (!isEqual(nextState.size, size)) {
      shouldUpdate = true;
    }
    if (!isEqual(nextProps.columns, this.props.columns)) {
      shouldUpdate = true;
    }
    if (!isEqual(nextState.pagination, this.state.pagination)) {
      shouldUpdate = true;
    }
    if (!isEqual(nextState.selectedRowKeys, this.state.selectedRowKeys)) {
      shouldUpdate = true;
    }
    return shouldUpdate;
  }

  fetchData = () => {
    const { fetchFn } = this.props;
    let { currentPage } = this.state;
    if (fetchFn) {
      fetchFn(currentPage);
      currentPage++;
      this.setState({ currentPage });
    }
  };

  renderProps = (propsInput = {}) => {
    const { isPaginate } = this.props;
    const { size } = this.state;
    let props = {
      className: "tripto-table",
      ...propsInput,
      pagination: isPaginate ?? false,
      size: size,
      rowSelection: {},
    };

    return props;
  };

  // EVENT
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  render() {
    return (
      <div id={this.idTable} className="table--antd_wrapper">
        <Form
          layout="inline"
          className="components-table-demo-control-bar"
          style={{ marginBottom: 16 }}
        >
          <Form.Item label="Size">
            <Radio.Group
              value={this.state.size}
              onChange={this.handleSizeChange}
            >
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="middle">Middle</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
        <Table {...this.renderProps(this.props.tableProps)} />
      </div>
    );
  }
}

DataTable.propTypes = {
  tableProps: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  tableBorder: PropTypes.bool,
  fetchFn: PropTypes.func,
  isPaginate: PropTypes.bool,
};

DataTable.defaultProps = {
  tableBorder: false,
  isSortClient: false,
  isPaginate: false,
  data: {
    items: [],
    total: null,
  },
  columns: [],
  loading: false,
};

export default DataTable;
