import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { TooltipAnt } from "../TooltipAnt";
import "./tree-table.scss";
import { Table, Button } from "antd";

class TreeTable extends Component {
  pushActionToColumns = () => {
    const {
      handleDelete,
      handleEdit,
      handleView,
      allowEditAction,
      columns,
      showEditAction,
      showDeleteAction,
      handleShowAddSubgroup,
    } = this.props;

    const action = {
      title: "",
      dataIndex: "",
      key: "action",
      width: "22%",
      render: (record) => {
        return (
          <div className="action">
            <Button
              className="sub-group-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleShowAddSubgroup(record);
              }}
              type="default"
            >
              <FormattedMessage id="add_sub_group" />
            </Button>
            {handleDelete && this.checkShowAction(showDeleteAction, record) && (
              <TooltipAnt title="delete">
                <Button
                  className="btn-action-table"
                  data-test="button_table_delete"
                  ghost
                  name="table-delete"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(record);
                  }}
                >
                  <span
                    className="icon-ic-recycle-bin icon-delete"
                    data-test="table-action-delete"
                  />
                </Button>
              </TooltipAnt>
            )}
            {handleEdit && this.checkShowAction(showEditAction, record) && (
              <TooltipAnt title="edit">
                <Button
                  className={`btn-action-table ${
                    this.checkDisabledAction(allowEditAction, record)
                      ? "disabled-custom"
                      : ""
                  }`}
                  data-test="button_table_edit"
                  ghost
                  name="table-edit"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    !this.checkDisabledAction(allowEditAction, record) &&
                      handleEdit(record);
                  }}
                >
                  <span
                    className="icon-ic-pencil-compact icon-edit"
                    data-test="table-action-edit"
                  />
                </Button>
              </TooltipAnt>
            )}
            {handleView && (
              <TooltipAnt title="view">
                <Button
                  className="btn-action-table"
                  data-test="button_table_view"
                  ghost
                  name="table-view"
                  onClick={() => handleView(record)}
                >
                  <span
                    className="icon-ic-open icon-view"
                    data-test="table-action-view"
                  />
                </Button>
              </TooltipAnt>
            )}
          </div>
        );
      },
    };
    return [...columns, action];
  };
  checkDisabledAction = (optionAllowAction, record) => {
    if (!optionAllowAction) return false;

    let inValid = false;
    for (const key in optionAllowAction) {
      if (record[key] && record[key] !== optionAllowAction[key]) {
        inValid = true;
      }
    }
    return inValid;
  };

  checkShowAction = (optionShowAction, record) => {
    if (!optionShowAction) return true;
    let inValid = false;
    for (const key in optionShowAction) {
      if (record[key] && record[key] === optionShowAction[key]) {
        inValid = true;
      }
    }
    return inValid;
  };
  renderProps = () => {
    const { loading, dataSource, pagination } = this.props;
    let props = {
      className: "tree-table-custom",
      columns: this.pushActionToColumns(),
      loading: loading,
      dataSource: dataSource,
      pagination: pagination,
    };
    props = { ...props };

    return props;
  };
  onRow = (record) => {
    return {
      onClick: () => {
        this.props.handleExpendedKeys(record);
      },
      className: this.props.expandedKeys.includes(record.key)
        ? "expand-parent"
        : "",
    };
  };
  onExpand = (expanded, { key }) => {
    const keys = this.state.expandedKeys;
    const expandedKeys = expanded
      ? keys.concat(key)
      : keys.filter((k) => k !== key);
    this.setState({ expandedKeys });
  };
  render() {
    const { name, expandedKeys } = this.props;
    return (
      <Table
        {...this.renderProps()}
        data-test={`treeTable_${name}`}
        expandedRowKeys={expandedKeys}
        onRow={this.onRow}
      />
    );
  }
}

TreeTable.defaultProps = {
  name: "",
  dataSource: [],
  columns: [],
  pagination: true,
  handleShowAddSubgroup: () => null,
};

TreeTable.propTypes = {
  name: PropTypes.string,
  dataSource: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleView: PropTypes.func,
  handleShowAddSubgroup: PropTypes.func,
};

export default TreeTable;
