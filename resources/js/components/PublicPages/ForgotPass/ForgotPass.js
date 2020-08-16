import React, { Component } from "react";
import { fetchService } from "services";
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
    ROOT_API_URL
} from "constants";
import { postLogin } from "modules/auth/actions";
import "./ForgotPass.scss";
import {
    selectIsLogged,
    selectErrors,
    selectLoading
} from "modules/auth/selectors";
import { ButtonAnt } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { NOTIFICATION_TYPE } from "constants";
import { openNotification } from "helpers";

export class ForgotPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            errorValidLogin: {}
        };
        this.setSubmitting = null;
    }
    // /api/oauth/password/reset
    async componentDidMount() {}

    handleBack = () => {
        this.props.history.goBack();
    };

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
        const { email } = values;

        // this.props.history.push(PUBLIC_ROUTE.CHANGEPASSWORD);

        //login(username, password);

        // gui request toi API forgot-password
        const data = { email };
        fetchService
            .fetch(`${ROOT_API_URL}/api/oauth/password/reset`, {
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(([resp, status]) => {
                // api tra ve ket qua check thanh cong hay khong o cho nay

                if (status === 200) {
                    this.props.history.push(PUBLIC_ROUTE.CHANGEPASSWORD);
                    // xu ly code thanh cong
                    // ney thanh cong thi redirect sang man hinh change password
                } else {
                    // cho phep form duoc submit tro lai
                    const { message } = resp;
                    openNotification(NOTIFICATION_TYPE.ERROR, message);
                    this.setSubmitting(false);
                }
            });
    };

    render() {
        const { errors, loading } = this.props;
        return (
            <div className="fullheight-wrapper">
                <div className="container">
                    <div className="backContainer" onClick={this.handleBack}>
                        <ArrowBackIosIcon className="backIcon" />
                        <p><FormattedMessage
                            id="common.back"
                            defaultMessage="common.back"
                        /></p>
                    </div>
                    <p className="t1">   <FormattedMessage
                            id="forgotPass.forgot"
                            defaultMessage="forgotPass.forgot"
                        /></p>
                    <p className="t2"> <FormattedMessage
                            id="forgotPass.please"
                            defaultMessage="forgotPass.please"
                        /></p>
                    <div className="codeFields">
                        {/* {this.renderFields()} */}
                        <Formik
                            initialValues={{
                                email: ""
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
                                    </>

                                    <div className="form-control sendCodeButton">
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
                                                    "forgotPass.send"
                                                }
                                                id={"forgotPass.send"}
                                            />
                                        </ButtonAnt>
                                    </div>

                                    <div className="bottomTextContainer">
                                        <FormattedMessage
                                            defaultMessage={
                                                "forgotPass.newbie"
                                            }
                                            id={"forgotPass.newbie"}
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

ForgotPass.defaultProps = {
    login: () => null,
    errors: {}
};

ForgotPass.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter
)(ForgotPass);
