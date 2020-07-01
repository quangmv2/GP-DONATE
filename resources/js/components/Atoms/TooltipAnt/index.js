import React from "react";
import { Tooltip } from "antd";
import { FormattedMessage } from "react-intl";

export const TooltipAnt = props => {
  const { title, children } = props;
  const formatTitle = title ? (
    <FormattedMessage
      defaultMessage="Add translate for this field"
      id={title}
    />
  ) : (
    ""
  );
  return <Tooltip title={formatTitle}>{children}</Tooltip>;
};
