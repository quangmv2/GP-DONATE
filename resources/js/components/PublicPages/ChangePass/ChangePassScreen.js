import React, { Component } from "react";
import { fetchService } from "services";
import { PropTypes } from "prop-types";

import {
    PUBLIC_ROUTE,
    ROOT_API_URL
} from "constants";
import { ButtonAnt, SignInBackground } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

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

    onSubmit = (values, { setSubmitting }) => {
        if (!this.setSubmitting) {
            this.setSubmitting = setSubmitting;
        }
        // const { resetpasscode, password, passchange } = values;
        const { resetpasscode, password, passchange } = values;

        // this.props.history.push(PUBLIC_ROUTE.LOGIN);

        const data = {
            token: resetpasscode,
            password: password,
            password_confirm: passchange
        };

        fetchService
            // o ham nay minh se gui request toi API change pass
            .fetch(`${ROOT_API_URL}/api/oauth/password/reset-confirm-token`, {
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(([resp, status]) => {
                // api tra ve ket qua check thanh cong hay khong o cho nay

                if (status === 200) {
                    // neu thanh cong thi lam chi do
                    this.props.history.push(PUBLIC_ROUTE.LOGIN);
                    // xu ly code thanh cong
                } else {
                    // neu that bai thi lam chi do
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

                                if (!(values.password === values.passchange)) {
                                    errors.passchange =
                                        "Confirm password did not match";
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
                                                            id="common.newPassword"
                                                            defaultMessage="new password"
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
                                                            id="common.confirmNewPassword"
                                                            defaultMessage="Confirm New Pasword"
                                                        />
                                                    }
                                                    value={values.passchange}
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



ChangePassScreen.defaultProps = {
    login: () => null,
    errors: {}
};

ChangePassScreen.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default ChangePassScreen;
