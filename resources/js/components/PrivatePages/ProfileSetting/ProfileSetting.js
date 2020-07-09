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
import { HeaderNavigation, LinkItem } from "components/Atoms";
import "./ProfileSetting.scss";
import {
    UserOutlined,
    RightOutlined,
    HeartOutlined,
    LockOutlined,
    ShareAltOutlined,
    BellOutlined,
    SendOutlined,
    QuestionCircleOutlined,
    LogoutOutlined
} from "@ant-design/icons";

export class ProfileSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            offervalue: "",
            duedate: "",
            hastag: "",
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
        const { description, offervalue, duedate, hashtag } = values;
        const { login } = this.props;
        this.props.history.push(PUBLIC_ROUTE.SIGNUP);
        //login(username, password);
    };

    render() {
        const { errors, loading } = this.props;
        return (
            <div className="private-fullheight">
                <div className="container">
                    <HeaderNavigation headerName="Profile Settings" />
                    <div className="body-wrapper">
                        <p className="info-box">ACCOUNT</p>
                        <div className="list-box">
                            <LinkItem
                                className="text-box link-center"
                                url={"/user-profile"}
                                icon={<UserOutlined className="icon" />}
                                title="Manage My Account"
                                arrow={<RightOutlined className="rightlined" />}
                            />
                        </div>
                        <div className="list-box">
                            <LinkItem
                                className="text-box link-center"
                                url={"#"}
                                icon={<HeartOutlined className="icon" />}
                                title="Project you have liked"
                                arrow={<RightOutlined className="rightlined" />}
                            />
                        </div>
                        <div className="list-box">
                            <LinkItem
                                className="text-box link-center"
                                url={"#"}
                                icon={<LockOutlined className="icon" />}
                                title="Privacy & Safety"
                                arrow={<RightOutlined className="rightlined" />}
                            />
                        </div>
                        <div className="list-box">
                            <LinkItem
                                className="text-box link-center"
                                url={"#"}
                                icon={<ShareAltOutlined className="icon" />}
                                title="Share profile"
                                arrow={<RightOutlined className="rightlined" />}
                            />
                        </div>
                        <div className="list-box">
                            <LinkItem
                                className="text-box link-center"
                                url={"#"}
                                icon={<BellOutlined className="icon" />}
                                title="Push notifications"
                                arrow={<RightOutlined className="rightlined" />}
                            />
                        </div>

                        <p className="info-box">SUPPORT</p>
                        <div className="list-box">
                            <LinkItem
                                className="text-box link-center"
                                url={"#"}
                                icon={<SendOutlined className="icon" />}
                                title="Report a problem"
                                arrow={<RightOutlined className="rightlined" />}
                            />
                        </div>
                        <div className="list-box">
                            <LinkItem
                                className="text-box link-center"
                                url={"#"}
                                icon={
                                    <QuestionCircleOutlined className="icon" />
                                }
                                title="Help Center"
                                arrow={<RightOutlined className="rightlined" />}
                            />
                        </div>
                        <div className="box-logout">
                            <LinkItem
                                className="text-logout"
                                url={"#"}
                                icon={<LogoutOutlined className="icon" />}
                                title="Log out"
                            />
                        </div>
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

ProfileSetting.defaultProps = {
    login: () => null,
    errors: {}
};

ProfileSetting.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter
)(ProfileSetting);
