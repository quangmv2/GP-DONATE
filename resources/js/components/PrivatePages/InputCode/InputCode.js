import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { openNotification } from "helpers";
import { ROUTE, NOTIFICATION_TYPE } from "constants";
import { createStructuredSelector } from "reselect";
import {
    selectIsLogged,
    selectErrors,
    selectLoading
} from "modules/auth/selectors";
import { verifyToken } from "modules/auth/actions";
import { ButtonAnt, SignInBackground } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { fetchService } from "../../../services/fetch/fetchService";
import { ROOT_API_URL, PRIVATE_ROUTE } from "../../../constants";
import "./inputCode.scss";
import { NavigatorContext } from "../../../context/BottomNavigatorContextAPI";

export class InputCode extends Component {

    static contextType = NavigatorContext;

    constructor(props) {
        super(props);
        this.state = {
            code_invitation: ""
        };
    }

    async componentDidMount() {
        this.context.setShowNavigator(false);
    }

    componentWillUnmount() {
    }

    onSubmit = async (values) => {
        const { code_invitation } = values;
        const res = await fetchService.fetch(`${ROOT_API_URL}/api/user/me/code-invitation`, {
            method: "POST",
            body: JSON.stringify({
                code_invitation: code_invitation
            })
        }).then(([resp, status]) => {
            return {
                data: resp,
                status,
            };
        });
        const { data, status } = res;
        if (status == 200) {
            this.props.verifyTokenFnc();
            this.handleSkip();
        }
        else {
            openNotification(NOTIFICATION_TYPE.ERROR, "Failed", "Not found code invitation");
        }
    }

    handleSkip = () => {
        const signup = localStorage.getItem("SIGNUP");
        if (signup) {
            localStorage.removeItem("SIGNUP");
            window.location.href = ROUTE.CONGRAT;
        } else {
            this.props.history.push(ROUTE.HOME);
        }
    }

    render() {
        const { loading, error } = this.props;
        return (
            <div className="fullheight-wrapper flex-center">
                <div className="container ">
                    <SignInBackground>
                        <p className="ic-t1"> <FormattedMessage
                            id="codePage.have"
                            defaultMessage="codePage.have"
                        /></p>
                        <p className="ic-t2"> <FormattedMessage
                            id="codePage.intivation"
                            defaultMessage="codePage.intivation"
                        /></p>
                    </SignInBackground>
                    <div className="formFields">
                        <Formik
                            initialValues={{
                                code_invitation: ""
                            }}
                            layout="vertical"
                            validate={values => {
                                const errors = {};
                                if (!values.code_invitation) {
                                    errors.code_invitation = "Required";
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
                                handleSubmit
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
                                                    <i className='icon-code form-icon'></i>
                                                    <TextField
                                                        error={
                                                            errors.code_invitation &&
                                                            touched.code_invitation
                                                        }
                                                        id="input-with-icon-grid"
                                                        label={
                                                            <FormattedMessage
                                                                id="codePage.code"
                                                                defaultMessage="codePage.code"
                                                            />
                                                        }
                                                        value={values.code_invitation}
                                                        onChange={handleChange}

                                                        helperText={
                                                            touched.code_invitation
                                                                ? errors.code_invitation
                                                                : ""
                                                        }
                                                        name="code_invitation"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </>

                                        <div className="form-control inputButton">
                                            <ButtonAnt
                                                className="custom-button-login btn-block btn-round btn-red buttonContainer"
                                                id="login-btn"
                                                name="login-btn"
                                                onClick={handleSubmit}
                                                type="primary"
                                            >
                                                <FormattedMessage
                                                    defaultMessage={
                                                        "codePage.submit"
                                                    }
                                                    id={"codePage.submit"}
                                                />
                                            </ButtonAnt>

                                        </div>
                                        <div className="form-control ">
                                            <Link to="#">
                                                <ButtonAnt
                                                    className="custom-button-login btn-block btn-round btn-red ol-bn-container center-button"
                                                    id="login-btn"
                                                    name="login-btn"
                                                    type="primary"
                                                    onClick={this.handleSkip}
                                                    style={{
                                                        margin: " 0 auto"
                                                    }}
                                                >
                                                    <FormattedMessage
                                                        defaultMessage={
                                                            "codePage.skip"
                                                        }
                                                        id={"codePage.skip"}
                                                    />
                                                </ButtonAnt>
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
    verifyTokenFnc: verifyToken,
};

const mapStateToProps = createStructuredSelector({
    isLogged: selectIsLogged(),
    errors: selectErrors(),
    loading: selectLoading()
});


InputCode.defaultProps = {
    login: () => null,
    errors: {}
};

InputCode.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(InputCode);
