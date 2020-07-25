import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { postLogin } from "modules/auth/actions";
import {
    selectIsLogged,
    selectErrors,
    selectLoading,
    selectUserInfo
} from "modules/auth/selectors";
import { HeaderNavigation } from "components/Atoms";
import "./EditProfile.scss";
import { StarFilled } from "@ant-design/icons";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import { Upload, message } from "antd";
import {
    LoadingOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { GET_IMAGE } from "../../../constants/routes";

function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 4;
    if (!isLt2M) {
        message.error("Image must smaller than 4MB!");
    }
    return isJpgOrPng && isLt2M;
}

export class EditProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            offervalue: "",
            duedate: "",
            hastag: "",
            errorValidLogin: {}
        };
        this.setSubmitting = null;
    }
    async componentDidMount() { 
    }

    componentDidUpdate(prevProps) { }

    render() {
        const { errors, loading, userInfo } = this.props;

        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="private-fullheight">
                <div className="container">
                    <HeaderNavigation headerName="Edit Profile" />

                    <div className="bgImg">
                        <div className="info-bg">

                           {userInfo.code_id !== null ? <div className="image">
                                <StarFilled className="icon-star" />
                                <img
                                 src="/images/10.jpg"
                                    //  src={GET_IMAGE(userInfo.personal_photo)}
                                    alt="Girl in a jacket"
                                    width="60"
                                    height="60"
                                ></img>
                            </div> : <div className="image"><img
                                    src="/images/10.jpg"
                                     //  src={GET_IMAGE(userInfo.personal_photo)}
                                    alt="Girl in a jacket"
                                    width="60"
                                    height="60"
                                ></img> </div>}
                            <span className="text">Change your avatar</span>
                        </div>
                    </div>
                    <div className="body-wrapper wrapper-profile">
                        <Formik
                            initialValues={{
                                name: "",
                                username: "",
                                foundation: ""
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.username) {
                                    errors.username = "Required";
                                }

                                if (!values.name) {
                                    errors.name = "Required";
                                }

                                return errors;
                            }}
                            onSubmit={(values, actions) => {
                                console.log(values);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                //handleBlur,
                                handleSubmit,
                                isSubmitting
                                /* and other goodies */
                            }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-submit">
                                            <TextField
                                                className="form-text"
                                                id="standard-password-input"
                                                label="Name"
                                                type="text"
                                                required
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                error={errors.name && touched.name}
                                                helperText={
                                                    touched.name ? errors.name : ""
                                                }
                                            />
                                        </div>
                                        <div className="form-submit">
                                            <label className='username-label'>User name</label>
                                            <TextField
                                                disabled
                                                className="form-text"
                                                id="standard-password-input"
                                                placeholder= {userInfo.username}
                                                type="text"
                                                name="username"
                                                value={values.username}
                                                onChange={handleChange}
                                                error={
                                                    errors.username &&
                                                    touched.username
                                                }
                                                helperText={
                                                    touched.username
                                                        ? errors.username
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="form-submit">
                                            <TextField
                                                className="form-text"
                                                id="standard-password-input"
                                                label="Foudation"
                                                type="text"
                                                name="foundation"
                                                onChange={handleChange}
                                                value={values.foundation}
                                            />
                                        </div>

                                        <div className="form-submit form-upload">
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                beforeUpload={beforeUpload}
                                                onChange={this.handleChange}
                                            >
                                                {uploadButton}
                                            </Upload>
                                        </div>
                                        <button
                                            type="submit"
                                            className="button"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                    </button>
                                    </form>
                                )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});

EditProfile.defaultProps = {
    login: () => null,
    errors: {}
};

EditProfile.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
