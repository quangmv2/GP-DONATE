import React from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";
import "./spin-loading.scss";

const SpinLoading = ({ icon, showOrHide }) => {
  return showOrHide && <Spin indicator={icon} />;
};

SpinLoading.defaultProps = {
  icon: "loading",
  showOrHide: false,
};

SpinLoading.propTypes = {
  icon: PropTypes.element,
  showOrHide: PropTypes.bool,
};

export default SpinLoading;
