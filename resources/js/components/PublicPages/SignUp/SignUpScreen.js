import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { postSignUp } from "modules/auth/actions";
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
import { ROUTE } from "../../../constants/routes";


export class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            usersname: "",
            password: "",
            errorValidLogin: {}
        };
        this.setSubmitting = null;
        this.redirectPrivatePage = this.redirectPrivatePage.bind(this);
    }

    async componentDidMount() {};

    onSubmit = (values, { setSubmitting }) => {
        if (!this.setSubmitting) {
            this.setSubmitting = setSubmitting;
        }
        const { email, username, password } = values;
        const { signUp } = this.props;
        signUp(username, email, password);
        
    }
    componentDidUpdate() {
        const { isLogged } = this.props;
        if ( isLogged ) {
            this.redirectPrivatePage();
        }
    }

    redirectPrivatePage = () => {
        const { history } = this.props;
        history.push(ROUTE.CHOOSEROLE);
    };

    render() {
       const { loading, error } = this.props;
        return (
            <div className="fullheight-wrapper flex-center">
                <div className="container ">
                    <SignInBackground>
                        <p className="text1"><FormattedMessage
                            id="loginPage.signup"
                            defaultMessage="loginPage.signup"
                        /></p>
                        <p className="text2"><FormattedMessage
                            id="signupPage.making"
                            defaultMessage="signupPage.making"
                        /></p>
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
                                                        loading
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
                                                        loading
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
                                                        loading
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
                                                    loading 
                                                }
                                                id="login-btn"
                                                loading={
                                                    loading
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
                                        {/* <Link to="/input-code">
                                            <ButtonAnt
                                                className="btn-block btn-round btn-red ol-bn-container"
                                                disabled={
                                                    loading
                                                }
                                                id="login-btn"
                                                loading={
                                                    loading
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
                                        </Link> */}
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
    signUp: postSignUp
};

const mapStateToProps = createStructuredSelector({
    isLogged: selectIsLogged(),
    errors: selectErrors(),
    loading: selectLoading()
});

SignUpScreen.defaultProps = {
    login: () => null,
    errors: {}
};

SignUpScreen.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
