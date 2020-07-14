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
import {
    URL_REDIRECT_LOGIN,
    ROUTE,
    PUBLIC_ROUTE,
    PRIVATE_ROUTE,
} from "constants";
import { postLogin } from "modules/auth/actions";
import {
    selectIsLogged,
    selectErrors,
    selectLoading,
} from "modules/auth/selectors";
import { ButtonAnt, SignInBackground } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import "./login.scss";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorValidLogin: {},
        };
        this.setSubmitting = null;
    }

    async componentDidMount() { }

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
        // this.props.history.push(PRIVATE_ROUTE.HOME);
        login(username, password);
    };

    render() {
        const { errors, loading } = this.props;

        return (
            <div className="fullheight-wrapper flex-center">
                <div className="container">
                    <SignInBackground>
                        <p className="text1">Sign In</p>
                        <p className="text2">To keep connected with us</p>
                    </SignInBackground>
                    <div className="formFields">
                        {/* {this.renderFields()} */}
                        <Formik
                            initialValues={{
                                username: "",
                                password: "",
                                passchange: "",
                            }}
                            layout="vertical"
                            validate={(values) => {
                                const errors = {};
                                if (!values.username) {
                                    errors.username = "Required";
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
                                isSubmitting,
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
                                                    {/* <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel> */}
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
                                        <Link
                                            className="fg-pw-text"
                                            to="/forgot-password"
                                        >
                                            <FormattedMessage
                                                defaultMessage={
                                                    "loginPage.forgotPassword"
                                                }
                                                id={"loginPage.forgotPassword"}
                                            ></FormattedMessage>
                                        </Link>
                                        <Link to="/signup">
                                            <div className="form-control filledButton">
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
                                                            "loginPage.login"
                                                        }
                                                        id={"loginPage.login"}
                                                    />
                                                </ButtonAnt>
                                            </div>
                                        </Link>

                                        <div className="bottomTextContainer">
                                            <FormattedMessage
                                                defaultMessage={"loginPage.newbie"}
                                                id={"loginPage.newbie"}
                                            ></FormattedMessage>
                                            <Link
                                                className="bottomLink"
                                                to="/signup"
                                            >
                                                <FormattedMessage
                                                    defaultMessage={
                                                        "loginPage.signup"
                                                    }
                                                    id={"loginPage.signup"}
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
    login: postLogin,
};

const mapStateToProps = createStructuredSelector({
    isLogged: selectIsLogged(),
    errors: selectErrors(),
    loading: selectLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: FEATURE_NAME_AUTH, reducer });
const withSaga = injectSaga({ key: FEATURE_NAME_AUTH, saga });

Login.defaultProps = {
    login: () => null,
    errors: {},
};

Login.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool,
};

export default compose(withReducer, withSaga, withConnect, withRouter)(Login);
