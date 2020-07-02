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
import './InputCode.scss';
import InputAdornment from '@material-ui/core/InputAdornment';
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
import { Link } from 'react-router-dom';
import { PUBLIC_ROUTE } from "../../../constants";

export class InputCode extends Component {
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
        const { code} = values;
        const { login } = this.props;
        this.props.history.push(PUBLIC_ROUTE.LOGIN)

        //login(username, password);
    };

    render() {
        const { errors, loading } = this.props;

        return (
            <div class="fullheight-wrapper flex-center">
                <div className="container ">
                    <SignInBackground>
                        <p className="ic-t1">Sign up by</p>
                        <p className="ic-t2">Invitation Code</p>
                    </SignInBackground>
                    <div className="formFields">
                        {/* {this.renderFields()} */}
                        <Formik
                            initialValues={{
                                code: "",
                                
                            }}
                            layout="vertical"
                            validate={values => {
                                const errors = {};
                                
                                if (!values.code) {
                                    errors.code = "Required";
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
                                                        errors.code &&
                                                        touched.code
                                                    }
                                                    id="input-with-icon-grid"
                                                    label={
                                                        <FormattedMessage
                                                            id="codePage.code"
                                                            defaultMessage="codePage.code"
                                                        />
                                                    }
                                                    value={values.code}
                                                    onChange={handleChange}
                                                    disabled={
                                                        loading || isSubmitting
                                                    }
                                                    helperText={
                                                        touched.code
                                                            ? errors.code
                                                            : ""
                                                    }
                                                  
                                                    name="code"
                                                />
                                            </Grid>
                                        </Grid>
                                        
                                    </>
                                                
                                    <div className="form-control inputButton">
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
                                                    "codePage.submit"
                                                }
                                                id={"codePage.submit"}
                                            />
                                        </ButtonAnt>
                                    </div>
                                    <div className="form-control outlineButton">
                                        <ButtonAnt
                                            className="btn-block btn-round btn-red ol-bn-container"
                                            disabled={loading || isSubmitting}
                                            id="login-btn"
                                            loading={loading || isSubmitting}
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
                                    </div>
                             

                                    <div className="bottomTextContainer">
                                    <FormattedMessage
                                                defaultMessage={
                                                    "signupPage.onboard"
                                                }
                                                id={"signupPage.onboard"}
                                            >
                                      </FormattedMessage>
                                      <Link className ='bottomLink' to= '/signup'>
                                      <FormattedMessage
                                                defaultMessage={
                                                    "signupPage.signed"
                                                }
                                                id={"signupPage.signed"}
                                            >
                                      </FormattedMessage>
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

InputCode.defaultProps = {
    login: () => null,
    errors: {}
};

InputCode.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default compose(withReducer, withSaga, withConnect, withRouter)(InputCode);
