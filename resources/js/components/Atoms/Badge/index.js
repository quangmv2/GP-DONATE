import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./badge.scss";

export const Badge = ({ value, stylesCustom, className }) => {
  return (
    <span
      className={cn("badge-custom", className)}
      style={{
        backgroundColor: stylesCustom.backGround,
        color: stylesCustom.colorText,
      }}
    >
      {value || ""}
    </span>
  );
};

Badge.defaultProps = {
  value: "",
  stylesCustom: {
    backGround: "red",
    colorText: "white",
  },
  className: "",
};

Badge.propTypes = {
  value: PropTypes.any,
  stylesCustom: PropTypes.object,
  className: PropTypes.string,
};
export default Badge;
