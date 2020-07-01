import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Upload } from "antd";
import { FormattedMessage } from "react-intl";
import { ROOT_API_URL } from "constants/index";
import Carousel, { Modal, ModalGateway } from "react-images";
import "./multiple-upload.scss";

const { Dragger } = Upload;

const MultipleUpload = ({
  label,
  onChange,
  onRemove,
  images,
  disabled,
  isRequired,
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [indexSelected, setIndexSelected] = useState(0);

  const uploadButton = (
    <div className="upload-button-custom">
      <div className="upload_dnd">
        <FormattedMessage id="dnd" />
      </div>
      <div className="ant-upload-text">
        <span className="upload_your_photo">
          <FormattedMessage id="your_photo" />
        </span>
        <span className="upload_browse_text">
          <FormattedMessage id="browse" />
        </span>
      </div>
    </div>
  );

  const onInputFile = async ({ file }) => {
    if (file.status === "done") {
      onChange(file.response.data[0]);
    }
    if (file.status === "removed") {
      onRemove(file);
    }
  };

  const handlePreview = (file) => {
    const key = file.response ? file.response.data[0].key : file.key;
    setPreviewVisible(true);
    setIndexSelected(listFileSlide.findIndex((item) => item.key === key));
  };
  const handleDownload = (file) => {
    const url = file.response ? file.response.data[0].url : file.url;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement("a");
      tag.href = imageUrl;
      tag.download =
        file.name.indexOf(".") >= 0 ? file.name : file.name + ".jpg";
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    };
    xhr.send();
  };

  const handleCancelPreview = () => {
    setPreviewVisible(false);
    setIndexSelected(0);
  };
  const listFile = images.map((file, index) => {
    return { ...file, uid: index, status: "done" };
  });

  const listFileSlide = images.map((file) => {
    return { ...file, src: file.url, download: file.url };
  });

  const renderProps = () => {
    let props = {
      action: `${ROOT_API_URL}/api/image/upload-file`,
      className: "upload-custom",
      disabled: disabled,
      multiple: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AUTHORIZE_TOKEN")}`,
      },
      listType: "picture-card",
      name: "files",
      onChange: onInputFile,
      onPreview: handlePreview,
      onDownload: handleDownload,
    };
    if (listFile.length > 0) {
      if (disabled) {
        props = Object.assign({}, props, { fileList: listFile });
      } else {
        props = Object.assign({}, props, { defaultFileList: listFile });
      }
    }
    return props;
  };

  return (
    <div className="wrapper-upload-custom clearfix">
      <Form.Item
        className="form-item-custom"
        label={
          label && (
            <span>
              <FormattedMessage
                defaultMessage="Default message"
                id={label}
                values={{
                  optional: (
                    <span style={{ fontWeight: "normal" }}>(Optional)</span>
                  ),
                }}
              />
              {isRequired && <span className="field--required">*</span>}
            </span>
          )
        }
      >
        <Dragger {...renderProps()}>{uploadButton}</Dragger>

        <ModalGateway>
          {previewVisible ? (
            <Modal className="modal-slide-custom" onClose={handleCancelPreview}>
              <Carousel currentIndex={indexSelected} views={listFileSlide} />
            </Modal>
          ) : null}
        </ModalGateway>
      </Form.Item>
    </div>
  );
};

MultipleUpload.defaultProps = {
  label: "",
  images: [
    {
      uuid: 1,
      name: "image",
      url: "http",
    },
  ],
  disabled: false,
  isRequired: false,
};

MultipleUpload.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  images: PropTypes.array,
  disabled: PropTypes.bool,
  onRemove: PropTypes.func,
  isRequired: PropTypes.bool,
};

export default MultipleUpload;
