import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Alert } from "antd";
import "./styles.scss";
const DISMISS_TIME = 3000;

const AlertAnt = ({ content }) => {
  const { status, message, autoDismiss, time } = content;
  const [dismiss, setDismiss] = useState(false);

  useEffect(() => {
    if (autoDismiss) {
      setTimeout(() => {
        setDismiss(true);
      }, time ?? DISMISS_TIME);
    }
  }, [status, message, autoDismiss, time]);

  return !dismiss ? (
    <div className={`alert-${status}`}>
      <Alert message={message} showIcon type={status} />
    </div>
  ) : null;
};

AlertAnt.defaultProps = {
  content: {},
};

AlertAnt.propTypes = {
  content: PropTypes.object,
};

export { AlertAnt as Alert };
