import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
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
import "./login.scss";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";

import userIcon from "../../../../../public/images/user-icon.png";
import FilledButton from "../../Atoms/AuthButton/FilledButton";
import BottomText from "../../Atoms/AuthButton/BottomText";
import signInFields from "./signInFields";

export class Login extends Component {
    renderFields() {
        return _.map(signInFields, ({ label, icon, type }) => {
            return (
                <div className="formContainer">
                    <p className="label">{label}</p>
                    <div class="inputContainer">
                        <img className="formIcon" src={userIcon} />
                        <div class="textInput">
                            {" "}
                            <input className="input" type={type} />{" "}
                        </div>

                        <hr className="borderInput" />
                    </div>
                </div>
            );
        });
    }
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
                    <SignInBacground>
                    <p className='text1'>Sign In</p>
                    <p className='text2'>To keep connected with us</p>
                    </SignInBacground>
                    <div className='formFields'>
          {this.renderFields()}
          </div>
          <a  href='/forgot-password'><p className='fg-pw-text'>Forgot your password?</p></a>
          <Link to='/signup' className='filledButton'>
               <FilledButton
              
               buttonContainer=' Sign In'
               />
               </Link>
               <div className='bottomTextContainer'>
    <BottomText 
    text='Im a newbie'
    linkContent='Sign Up'
    href='/signup'
    />
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
