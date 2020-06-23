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
import { postLogin, postChallengeChangePass } from "modules/auth/actions";
import {
    selectIsLogged,
    selectErrors,
    selectLoading,
    selectChallenge,
    selectUserChangePass
} from "modules/auth/selectors";
import { Image } from "components/Atoms";
// import { Checkbox } from "antd";
import { FormattedMessage } from "react-intl";
import { loginSchema, onValidationForm } from "helpers";
import _ from "lodash";
import "./login.scss";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passchange: "",
            isSubmit: false,
            errorValidLogin: {},
            remember: false
        };
    }

    async componentDidMount() {}

    componentDidUpdate(prevProps) {}

    redirectLogin = () => {
        const { history } = this.props;
        const url_redirect_login = localStorage.getItem(URL_REDIRECT_LOGIN);
        history.push(url_redirect_login ?? ROUTE.HOME);
    };

    onSubmit = () => {};

    handleChange = data => {
        const { name, value } = data;
        this.setState(
            {
                [name]: value
            },
            () => {
                this.onCheckValidLoginForm();
            }
        );
    };

    onCheckValidLoginForm = () => {
        const { username, password } = this.state;
        const { challenge } = this.props;
        let errorValidLogin;

        const schema = loginSchema();
        errorValidLogin = onValidationForm({ username, password }, schema);

        //check error
        if (errorValidLogin) {
            this.setState({ errorValidLogin });
            return false;
        } else {
            this.setState({ errorValidLogin: {} });
            return true;
        }
    };

    onChangeCheck = e => {
        this.setState({
            remember: e.target.checked
        });
    };

    render() {
        const { errors, loading } = this.props;

        const { username, password, errorValidLogin, isSubmit } = this.state;

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

                                <FormattedMessage
                                    defaultMessage={"loginPage.login"}
                                    id={"loginPage.login"}
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
    login: postLogin,
    challengeChangePass: postChallengeChangePass
    //updatePass: params => updateCurrentUser(params)
};

const mapStateToProps = createStructuredSelector({
    isLogged: selectIsLogged(),
    errors: selectErrors(),
    loading: selectLoading(),
    challenge: selectChallenge(),
    userChangePass: selectUserChangePass()
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
