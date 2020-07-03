import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Upload } from "antd";
import { FormattedMessage } from "react-intl";

import "./image-upload.scss";
import { ROOT_API_URL } from "constants";

const { Dragger } = Upload;

const ImageUpload = ({
  label,
  imageSrc,
  multiple,
  onChange,
  name,
  onLoading,
}) => {
  const [setLoading] = useState(false);

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

  const onInputFile = (resource) => {
    if (resource.file.status === "uploading") {
      setLoading(true);
      onLoading(true);
      return;
    }
    if (resource.file.status === "done") {
      onChange(resource.file.response.data[0]);
    }

    setLoading(false);
    onLoading(false);
  };

  return (
    <div className="wrapper-upload">
      <Form.Item
        className="form-item-custom"
        label={<FormattedMessage defaultMessage="Default message" id={label} />}
      >
        <Dragger
          action={`${ROOT_API_URL}/api/image/upload-file`}
          className={imageSrc.url ? "avatar-uploader" : "upload-drag-custom"}
          data-test={`input_${name}`}
          headers={{
            Authorization: `Bearer ${localStorage.getItem("AUTHORIZE_TOKEN")}`,
          }}
          multiple={multiple}
          name="files"
          onChange={onInputFile}
          showUploadList={false}
        >
          {imageSrc.url ? (
            <>
              <img alt="avatar" className="avatar-custom" src={imageSrc.url} />

              <div className="avatar-bound">
                <FormattedMessage id="edit" />
              </div>
            </>
          ) : (
            uploadButton
          )}
        </Dragger>
      </Form.Item>
    </div>
  );
};

ImageUpload.defaultProps = {
  label: "label",
  multiple: false,
  imageSrc: {
    url: "",
  },
  onLoading: () => null,
};

ImageUpload.propTypes = {
  label: PropTypes.string,
  imageSrc: PropTypes.object,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  onLoading: PropTypes.func,
};

export default ImageUpload;
