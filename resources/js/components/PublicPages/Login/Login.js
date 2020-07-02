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
import { URL_REDIRECT_LOGIN, ROUTE } from "constants";
import { postLogin } from "modules/auth/actions";

import {
    selectIsLogged,
    selectErrors,
    selectLoading
} from "modules/auth/selectors";
import { Image, ButtonAnt, Alert, Input, LinkEnhance } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { isEmptyString } from "helpers";
import { isEmpty } from "lodash";
import "./login.scss";
import { Formik } from "formik";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passchange: "",
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
        const { username, password } = values;
        const { login } = this.props;

        login(username, password);
    };

    render() {
        const { errors, loading } = this.props;

        return (
            <div className="container ">
                <div className="ant-col-lg-24">
                    <div className="full-height-screen flex-center">
                        <div className="form--sign-in">
                            <>
                                <div className="logo-login-wrapper big-text text-center">
                                    <span className="icon icon-pad-lock"></span>
                                    <Image src={`assets/images/logo.svg`} />
                                </div>
                                <div className="custom-alert">
                                    {!isEmpty(errors.message) && (
                                        <Alert
                                            content={{
                                                status: "error",
                                                message: errors.message
                                            }}
                                        />
                                    )}
                                </div>
                                <Formik
                                    initialValues={{
                                        username: "",
                                        password: "",
                                        passchange: ""
                                    }}
                                    layout="vertical"
                                    validate={values => {
                                        const errors = {};
                                        if (!values.username) {
                                            errors.username = "Required";
                                        } else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                                values.username
                                            )
                                        ) {
                                            errors.username =
                                                "Invalid email address";
                                        }

                                        if (!values.password) {
                                            errors.password = "Required";
                                        }

                                        return errors;
                                    }}
                                    onSubmit={this.onSubmit}
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
                                        <form
                                            onSubmit={handleSubmit}
                                            layout="vertical"
                                        >
                                            <>
                                                <Input
                                                    errors={errors.username}
                                                    touched={touched.username}
                                                    label="common.email"
                                                    name="username"
                                                    onChange={handleChange}
                                                    onPressEnter={handleSubmit}
                                                    placeholder="common.email"
                                                    type="text"
                                                    value={values.username}
                                                    disabled={
                                                        loading || isSubmitting
                                                    }
                                                />
                                                <Input
                                                    errors={errors.password}
                                                    touched={touched.password}
                                                    label={"common.password"}
                                                    name="password"
                                                    onChange={handleChange}
                                                    onPressEnter={handleSubmit}
                                                    placeholder="common.password"
                                                    showIconPassword
                                                    type="password"
                                                    value={values.password}
                                                    disabled={
                                                        loading || isSubmitting
                                                    }
                                                />
                                            </>
                                            <div className="form-control">
                                                <ButtonAnt
                                                    className="custom-button-login btn-block btn-round btn-red"
                                                    disabled={
                                                        loading || isSubmitting
                                                    }
                                                    id="login-btn"
                                                    loading={
                                                        loading || isSubmitting
                                                    }
                                                    name="login-btn"
                                                    onClick={handleSubmit}
                                                    type="primary"
                                                >
                                                    <FormattedMessage
                                                        defaultMessage={
                                                            "loginPage.login"
                                                        }
                                                        id={"loginPage.login"}
                                                    />
                                                </ButtonAnt>
                                            </div>
                                        </form>
                                    )}
                                </Formik>

                                <LinkEnhance
                                    title="loginPage.forgotPassword"
                                    url={ROUTE.FORGOT_PASSWORD}
                                />
                            </>
                        </div>
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

Login.defaultProps = {
    login: () => null,
    errors: {}
};

Login.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default compose(withReducer, withSaga, withConnect, withRouter)(Login);
