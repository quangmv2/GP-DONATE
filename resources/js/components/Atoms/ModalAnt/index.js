import React, { PureComponent } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import cn from "classnames";
import { renderIcon } from "helpers";
import "./modal-ant.scss";
class ModalAnt extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || "",
      visible: props.visible || false,
    };
  }

  render() {
    const {
      title,
      defaultMessage = "Default Message",
      visible,
      width,
      handleCancel,
      children,
      footer,
      handleOk,
      className,
      valuesFormattedMessageTitle,
      ...restProps
    } = this.props;

    return (
      <Modal
        cancelButtonProps={{
          name: "cancel_modal",
          "data-test": "button_cancel_modal",
        }}
        cancelText={
          <FormattedMessage defaultMessage="Default Message" id="cancel" />
        }
        className={cn("Modal-custom", className)}
        closeIcon={
          <button
            aria-label="Close"
            className="close_custom"
            data-test="close-modal"
          >
            {renderIcon("icon-ic-menu-close")}
          </button>
        }
        footer={footer}
        okButtonProps={{ name: "save_modal", "data-test": "button_save_modal" }}
        okText={<FormattedMessage defaultMessage="Default Message" id="save" />}
        onCancel={handleCancel}
        onOk={handleOk}
        title={
          title ? (
            <FormattedMessage
              defaultMessage={defaultMessage}
              id={title}
              values={valuesFormattedMessageTitle}
            />
          ) : null
        }
        visible={visible}
        width={width}
        {...restProps}
      >
        {children}
      </Modal>
    );
  }
}

ModalAnt.defaultProps = {
  title: "",
  handleCancel: () => null,
  handleOk: () => null,
  valuesFormattedMessageTitle: {},
};

ModalAnt.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
  footer: PropTypes.any,
  children: PropTypes.any,
  width: PropTypes.any,
  className: PropTypes.string,
};

ModalAnt.defaultProps = {
  title: "",
  width: "100%",
};

export default ModalAnt;
