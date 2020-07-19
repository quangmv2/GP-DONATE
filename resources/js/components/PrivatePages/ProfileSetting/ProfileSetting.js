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
import { postLogout } from "modules/auth/actions";
import {
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

const ProfileSetting = (props) => {
   
    const logoutFunc = (e) => {
        props.logout();
    }

    const { errors, loading } = props;
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
                            icon={<i className="icon-left icon-account-normal" />}
                            title="Manage My Account"
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"/post-like"}
                            icon={<i className="icon-left icon-like-normal" />}
                            title="Project you have liked"
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"#"}
                            icon={<i className="icon-left icon-password" />}
                            title="Privacy & Safety"
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"#"}
                            icon={<i className="icon-left icon-share-profile" />}
                            title="Share profile"
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"#"}
                            icon={<i className="icon-left icon-noti" />}
                            title="Push notifications"
                            arrow={<i className="icon-next" />}
                        />
                    </div>

                    <p className="info-box">SUPPORT</p>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"#"}
                            icon={<i className="icon-left icon-mail-dark" />}
                            title="Report a problem"
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"#"}
                            icon={
                                <i className="icon-left icon-help" />
                            }
                            title="Help Center"
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    <div className="box-logout"
                        onClick={logoutFunc}
                    >
                        <LinkItem
                            className="text-logout"
                            url={"#"}
                            icon={<i className="icon-left icon-log_out" />}
                            title="Log out"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    logout: postLogout,
};

const mapStateToProps = createStructuredSelector({
});

ProfileSetting.defaultProps = {
    login: () => null,
    errors: {}
};

ProfileSetting.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSetting);
