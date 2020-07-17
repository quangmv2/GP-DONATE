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
import {
    selectIsLogged,
    selectErrors,
    selectLoading
} from "modules/auth/selectors";
import { ButtonAnt, SignInBackground } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";

export class ChangePassScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resetpasscode: "",
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
        const { resetpasscode, password, passchange } = values;
        const { login } = this.props;
        this.props.history.push(PUBLIC_ROUTE.LOGIN);
        //login(username, password);
    };

    render() {
        const { errors, loading } = this.props;

        return (
            <div className="fullheight-wrapper flex-center">
                <div className="container ">
                    <SignInBackground>
                        <p className="text1">
                            Change <br /> your password
                        </p>
                        <p className="text2">Please enter your new password</p>
                    </SignInBackground>
                    <div className="formFields">
                        {/* {this.renderFields()} */}
                        <Formik
                            initialValues={{
                                resetpasscode: "",
                                password: "",
                                passchange: ""
                            }}
                            layout="vertical"
                            validate={values => {
                                const errors = {};
                                if (!values.resetpasscode) {
                                    errors.resetpasscode = "Required";
                                }
                                if (!values.passchange) {
                                    errors.passchange = "Required";
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
                                                        errors.resetpasscode &&
                                                        touched.resetpasscode
                                                    }
                                                    id="input-with-icon-grid"
                                                    label={
                                                        <FormattedMessage
                                                            id="resetPass.code"
                                                            defaultMessage="resetPass.code"
                                                        />
                                                    }
                                                    value={values.resetpasscode}
                                                    onChange={handleChange}
                                                    disabled={
                                                        loading || isSubmitting
                                                    }
                                                    helperText={
                                                        touched.resetpasscode
                                                            ? errors.resetpasscode
                                                            : ""
                                                    }
                                                    name="resetpasscode"
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
                                                        errors.passchange &&
                                                        touched.passchange
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
                                                        touched.passchange
                                                            ? errors.passchange
                                                            : ""
                                                    }
                                                    type="password"
                                                    name="passchange"
                                                />
                                            </Grid>
                                        </Grid>
                                    </>

                                    <div className="form-control filledButton bottomContainer">
                                        <ButtonAnt
                                            className="custom-button-login btn-block btn-round btn-red buttonContainer"
                                            disabled={loading || isSubmitting}
                                            id="login-btn"
                                            loading={loading || isSubmitting}
                                            name="login-btn"
                                            onClick={handleSubmit}
                                            type="primary"
                                        >
                                            <FormattedMessage
                                                defaultMessage={
                                                    "resetPass.save"
                                                }
                                                id={"resetPass.save"}
                                            />
                                        </ButtonAnt>
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

ChangePassScreen.defaultProps = {
    login: () => null,
    errors: {}
};

ChangePassScreen.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter
)(ChangePassScreen);
