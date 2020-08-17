import React, { useEffect, useContext } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { postLogout } from "modules/auth/actions";
import { HeaderNavigation, LinkItem } from "components/Atoms";
import { PRIVATE_ROUTE } from "../../../constants";
import {
    selectUserInfo
} from "modules/auth/selectors";
import { FormattedMessage } from "react-intl";
import { NavigatorContext } from "../../../context/BottomNavigatorContextAPI";

import "./ProfileSetting.scss";


const ProfileSetting = (props) => {

    const { setShowNavigator } = useContext(NavigatorContext);

    useEffect(() => {
        setShowNavigator(false);
    }, []);

    const logoutFunc = (e) => {
        props.logout();
    }

    const { userInfor } = props;

    return (
        <div className="private-fullheight">
            <div className="container">
                <HeaderNavigation headerName="Profile Settings" />
                <div className="body-wrapper">
                    <p className="info-box">
                        <FormattedMessage
                            defaultMessage={"profileSetting.account"}
                            id={"profileSetting.account"}
                        />
                    </p>
                    {
                        userInfor && userInfor.roles && userInfor.roles[0].name != "taker" && !userInfor.code_id &&
                        <div className="list-box">
                            <LinkItem
                                className="text-box link-center"
                                url={PRIVATE_ROUTE.INPUTCODE}
                                icon={<i className="icon-left icon-celeb" />}
                                title={"profileSetting.code"}
                                arrow={<i className="icon-next" />}
                            />
                        </div>
                    }
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={PRIVATE_ROUTE.MYPROFILE}
                            icon={<i className="icon-left icon-account-normal" />}
                            title={"profileSetting.manage"}
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"/post-like"}
                            icon={<i className="icon-left icon-like-normal" />}
                            title={"profileSetting.project"}
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    {
                        userInfor && userInfor.roles && userInfor.roles[0].name != "taker" &&
                        <div className="list-box">
                            <LinkItem
                                className="text-box link-center"
                                url={PRIVATE_ROUTE.MYPROJECTS}
                                icon={<i className="icon-left icon-code" />}
                                title={"profileSetting.myprojects"}
                                arrow={<i className="icon-next" />}
                            />
                        </div>
                    }
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"#"}
                            icon={<i className="icon-left icon-password" />}
                            title={"profileSetting.privacy"}
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"#"}
                            icon={<i className="icon-left icon-share-profile" />}
                            title={"profileSetting.share"}
                            arrow={<i className="icon-next" />}
                        />
                    </div>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"#"}
                            icon={<i className="icon-left icon-noti" />}
                            title={"profileSetting.push"}
                            arrow={<i className="icon-next" />}
                        />
                    </div>

                    <p className="info-box">SUPPORT</p>
                    <div className="list-box">
                        <LinkItem
                            className="text-box link-center"
                            url={"#"}
                            icon={<i className="icon-left icon-mail-dark" />}
                            title={"profileSetting.report"}
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
                            title={"profileSetting.help"}
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
                            title={"profileSetting.logout"}
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
    userInfor: selectUserInfo(),
});

ProfileSetting.defaultProps = {
    login: () => null,
    errors: {},
};

ProfileSetting.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSetting);
