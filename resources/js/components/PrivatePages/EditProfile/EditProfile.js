import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import injectReducer from "core/reducer/inject-reducer";
import injectSaga from "core/saga/inject-saga";
import reducer from "modules/auth/reducers";
import saga from "modules/auth/sagas";
import { FEATURE_NAME_AUTH } from "modules/auth/constants";
import { URL_REDIRECT_LOGIN, ROUTE, PUBLIC_ROUTE } from "constants";
import { postLogin } from "modules/auth/actions";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import {
    selectIsLogged,
    selectErrors,
    selectLoading
} from "modules/auth/selectors";
import { HeaderNavigation, LinkEdit } from "components/Atoms";
import "./EditProfile.scss";
import { StarFilled } from "@ant-design/icons";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import { Upload, message } from "antd";
import {
    LoadingOutlined,
    CameraOutlined,
    PlusOutlined
} from "@ant-design/icons";

// function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener("load", () => callback(reader.result));
//     reader.readAsDataURL(img);
// }

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
    async componentDidMount() {}

    componentDidUpdate(prevProps) {
        const { isLogged } = this.props;
        if (isLogged) {
            this.redirectLogin();
        }
    }

    redirectLogin = () => {
        const { history } = this.props;
        const url_redirect_login = localStorage.getItem(URL_REDIRECT_LOGIN);
        history.push(url_redirect_login ?? ROUTE.HOME);
    };

    onSubmit = (values, { setSubmitting }) => {
        if (!this.setSubmitting) {
            this.setSubmitting = setSubmitting;
        }
        const { description, offervalue, duedate, hashtag } = values;
        const { login } = this.props;
        this.props.history.push(PUBLIC_ROUTE.SIGNUP);
        //login(username, password);
    };
    // state = {
    //     loading: false
    // };

    // handleChange = info => {
    //     if (info.file.status === "uploading") {
    //         this.setState({ loading: true });
    //         return;
    //     }
    //     if (info.file.status === "done") {
    //         // Get this url from response in real world.
    //         getBase64(info.file.originFileObj, imageUrl =>
    //             this.setState({
    //                 imageUrl,
    //                 loading: false
    //             })
    //         );
    //     }
    // };

    render() {
        const { errors, loading } = this.props;

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
                            <div className="image">
                                <StarFilled className="icon-star" />

                                <img
                                    src="/images/10.jpg"
                                    alt="Girl in a jacket"
                                    width="60"
                                    height="60"
                                ></img>
                            </div>
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
                                        <TextField
                                            className="form-text"
                                            id="standard-password-input"
                                            label="Username"
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
    login: postLogin
};

const mapStateToProps = createStructuredSelector({
    isLogged: selectIsLogged(),
    errors: selectErrors(),
    loading: selectLoading()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: FEATURE_NAME_AUTH, reducer });
const withSaga = injectSaga({ key: FEATURE_NAME_AUTH, saga });

EditProfile.defaultProps = {
    login: () => null,
    errors: {}
};

EditProfile.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter
)(EditProfile);
