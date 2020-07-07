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
import SignInBackground from "../../Atoms/AuthBackground/SignInBackground";
import {
    selectIsLogged,
    selectErrors,
    selectLoading
} from "modules/auth/selectors";
import { Image, ButtonAnt, Alert, Input, LinkEnhance } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { isEmptyString } from "helpers";
import { isEmpty } from "lodash";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import "./signUp.scss";
import { PUBLIC_ROUTE } from "constants";
import InputAdornment from "@material-ui/core/InputAdornment";

export class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
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
        const { email, username, password } = values;
        const { login } = this.props;
        this.props.history.push(PUBLIC_ROUTE.CHOOSEROLE);

        //login( email, username, password);
    };

    render() {
        const { errors, loading } = this.props;

        return (
            <div className="fullheight-wrapper flex-center">
                <div className="container ">
                    <SignInBackground>
                        <p className="text1">Sign Up</p>
                        <p className="text2">Making generousity easy</p>
                    </SignInBackground>
                    <div className="formFields">
                        {/* {this.renderFields()} */}
                        <Formik
                            initialValues={{
                                email: "",
                                username: "",
                                password: ""
                            }}
                            layout="vertical"
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = "Required";
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                        values.email
                                    )
                                ) {
                                    errors.email = "Invalid email address";
                                }

                                if (!values.password) {
                                    errors.password = "Required";
                                }
                                if (!values.username) {
                                    errors.username = "Required";
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
                                <form onSubmit={handleSubmit} layout="vertical">
                                    <>
                                        <Grid
                                            container
                                            spacing={1}
                                            alignItems="flex-end"
                                            className="form-control"
                                        >
                                            <Grid
                                                item
                                                className="item-flex input-with-icon"
                                            >
                                                <AccountCircle />
                                                <AccountCircle />
                                                <TextField
                                                    error={
                                                        errors.username &&
                                                        touched.username
                                                    }
                                                    id="input-with-icon-grid"
                                                    label={
                                                        <FormattedMessage
                                                            id="common.username"
                                                            defaultMessage="common.username"
                                                        />
                                                    }
                                                    value={values.username}
                                                    onChange={handleChange}
                                                    disabled={
                                                        loading || isSubmitting
                                                    }
                                                    helperText={
                                                        touched.username
                                                            ? errors.username
                                                            : ""
                                                    }
                                                    name="username"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid
                                            container
                                            spacing={1}
                                            alignItems="flex-end"
                                            className="form-control"
                                        >
                                            <Grid
                                                item
                                                className="item-flex input-with-icon"
                                            >
                                                <AccountCircle />
                                                <TextField
                                                    error={
                                                        errors.email &&
                                                        touched.email
                                                    }
                                                    id="input-with-icon-grid"
                                                    label={
                                                        <FormattedMessage
                                                            id="common.email"
                                                            defaultMessage="common.email"
                                                        />
                                                    }
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    disabled={
                                                        loading || isSubmitting
                                                    }
                                                    helperText={
                                                        touched.email
                                                            ? errors.email
                                                            : ""
                                                    }
                                                    type="email"
                                                    name="email"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            container
                                            spacing={1}
                                            alignItems="flex-end"
                                            className="form-control"
                                        >
                                            <Grid
                                                item
                                                className="item-flex input-with-icon"
                                            >
                                                <AccountCircle />
                                                <TextField
                                                    error={
                                                        errors.password &&
                                                        touched.password
                                                    }
                                                    id="input-with-icon-grid"
                                                    label={
                                                        <FormattedMessage
                                                            id="common.password"
                                                            defaultMessage="common.password"
                                                        />
                                                    }
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    disabled={
                                                        loading || isSubmitting
                                                    }
                                                    helperText={
                                                        touched.password
                                                            ? errors.password
                                                            : ""
                                                    }
                                                    type="password"
                                                    name="password"
                                                />
                                            </Grid>
                                        </Grid>
                                    </>

                                    <div className="form-control filledButton">
                                        <Link to="/choose-role">
                                            <ButtonAnt
                                                className="custom-button-login btn-block btn-round btn-red buttonContainer"
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
                                                        "signupPage.createacc"
                                                    }
                                                    id={"signupPage.createacc"}
                                                />
                                            </ButtonAnt>
                                        </Link>
                                    </div>
                                    <div className="form-control outlineButton">
                                        <Link to="/input-code">
                                            <ButtonAnt
                                                className="btn-block btn-round btn-red ol-bn-container"
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
                                                        "signupPage.gotCode"
                                                    }
                                                    id={"signupPage.gotCode"}
                                                />
                                            </ButtonAnt>
                                        </Link>
                                    </div>

                                    <div className="bottomTextContainer">
                                        <FormattedMessage
                                            defaultMessage={
                                                "signupPage.onboard"
                                            }
                                            id={"signupPage.onboard"}
                                        ></FormattedMessage>
                                        <Link className="bottomLink" to="/">
                                            <FormattedMessage
                                                defaultMessage={
                                                    "signupPage.signed"
                                                }
                                                id={"signupPage.signed"}
                                            ></FormattedMessage>
                                        </Link>
                                    </div>
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

SignUpScreen.defaultProps = {
    login: () => null,
    errors: {}
};

SignUpScreen.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter
)(SignUpScreen);
