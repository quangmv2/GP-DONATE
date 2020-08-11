import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { postLogout } from "modules/auth/actions";
import { HeaderNavigation, LinkItem } from "components/Atoms";
import "./ProfileSetting.scss";
import { PRIVATE_ROUTE } from "../../../constants";
import {
    selectUserInfo
} from "modules/auth/selectors";
import { FormattedMessage } from "react-intl";

const ProfileSetting = (props) => {
   
    const logoutFunc = (e) => {
        props.logout();
    }

    const { errors, loading, userInfo } = props;
    return (
        <div className="private-fullheight">
            <div className="container">
                <HeaderNavigation headerName="Profile Settings" />
                <div className="body-wrapper">
                    <p className="info-box">
                        <FormattedMessage
                            id="profileSetting.account"
                            defaultMessage="profileSetting.account"
                        />
                    </p>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={PRIVATE_ROUTE.MYPROFILE}
                            icon={<i className="icon-left icon-account-normal" />}
                            title={
                                <FormattedMessage
                                    id="profileSetting.manage"
                                    defaultMessage="profileSetting.manage"
                                />
                            }
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"/post-like"}
                            icon={<i className="icon-left icon-like-normal" />}
                            title={
                            <FormattedMessage
                                id="profileSetting.project"
                                defaultMessage="profileSetting.project"
                            />
                        }
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"#"}
                            icon={<i className="icon-left icon-password" />}
                            title={
                                <FormattedMessage
                                    id="profileSetting.privacy"
                                    defaultMessage="profileSetting.privacy"
                                />
                            }
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"#"}
                            icon={<i className="icon-left icon-share-profile" />}
                            title={
                                <FormattedMessage
                                    id="profileSetting.share"
                                    defaultMessage="profileSetting.share"
                                />
                            }
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"#"}
                            icon={<i className="icon-left icon-noti" />}
                            title={
                                <FormattedMessage
                                    id="profileSetting.push"
                                    defaultMessage="profileSetting.push"
                                />
                            }
                            arrow={<i className="icon-next" />}
                        />
                    </div>

                    <p className="info-box">SUPPORT</p>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"#"}
                            icon={<i className="icon-left icon-mail-dark" />}
                            title={
                                <FormattedMessage
                                    id="profileSetting.report"
                                    defaultMessage="profileSetting.report"
                                />
                            }
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
                            title={
                                <FormattedMessage
                                    id="profileSetting.help"
                                    defaultMessage="profileSetting.help"
                                />
                            }
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
                            title={
                                <FormattedMessage
                                    id="profileSetting.logout"
                                    defaultMessage="profileSetting.logout"
                                />
                            }
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
    userInfo: selectUserInfo()
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
