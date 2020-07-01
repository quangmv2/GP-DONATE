import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tree } from "antd";

import "./tree-ant.scss";
const { TreeNode } = Tree;

class TreeAnt extends Component {
  onExpand = (expandedKeys) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.props.onExpand(expandedKeys);
  };

  onSelect = (selectedKeys, info) => {
    this.props.onSelect(selectedKeys, info);
  };

  renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode dataRef={item} key={item.key} title={item.title}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });

  render() {
    const {
      treeData,
      autoExpandParent,
      expandedKeys,
      selectedKeys,
    } = this.props;
    return (
      <div className="tree-node">
        <Tree
          autoExpandParent={autoExpandParent}
          expandedKeys={expandedKeys}
          onExpand={this.onExpand}
          onSelect={this.onSelect}
          selectedKeys={selectedKeys}
          showLine
        >
          {this.renderTreeNodes(treeData)}
        </Tree>
      </div>
    );
  }
}

TreeAnt.defaultProps = {
  treeData: [],
  expandedKeys: [],
  autoExpandParent: false,
  selectedKeys: [],
};

TreeAnt.propTypes = {
  treeData: PropTypes.array,
  expandedKeys: PropTypes.array,
  autoExpandParent: PropTypes.bool,
  selectedKeys: PropTypes.any,
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
};

export default TreeAnt;
