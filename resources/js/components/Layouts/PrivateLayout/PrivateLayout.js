import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { fetchService } from "services";
import {
    selectIsLogged,
    selectErrors,
    selectLoading
} from "modules/auth/selectors";
import { verifyToken } from "modules/auth/actions";

import ReactResizeDetector from "react-resize-detector";
import { createStructuredSelector } from "reselect";

import { ROUTE, TIME_INTERVAL_SESSION } from "constants";
import "./private-layout.scss";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants/auth";
import { withRouter } from "react-router-dom";
import { URL_REDIRECT_LOGIN } from "../../../constants/variables";

const { Content } = Layout;

class PrivateLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            openKeys: [],
            pathname: window.location.pathname,
            currentTabSidebar: window.location.pathname
        };

        this.interval = null;
        this.redirectLogin = this.redirectLogin.bind(this);
    }

    componentDidMount() {
        const accesstoken = localStorage.getItem(ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        const { verifyTokenFnc } = this.props;
        if (accesstoken && accesstoken != "") {
            fetchService.addTokenHeader({ access_token: accesstoken });
            verifyTokenFnc(accesstoken, refreshToken);    
        } else {
            this.redirectLogin();
        }
    }

    redirectLogin = () => {
        const { history, location } = this.props;
        history.push(ROUTE.LOGIN);
    };

    componentDidUpdate(prevProps) {
        const { isLogged } = this.props;
        if (prevProps.isLogged === isLogged) return false;
        if (!isLogged) {
            localStorage.setItem(URL_REDIRECT_LOGIN, location.pathname);
            this.redirectLogin();
        }
    }

    componentWillUnmount() { }

    handleResize = () => {
        const windowSize = window.innerWidth;
    };

    onResize = () => { };

    render() {
        const { children } = this.props;
        return (
            <Layout id="tripto-private-layout" theme="dark" className="dark">
                <Layout>
                    <div
                        className="content-layout wide-container"
                        id="main-layout"
                    >
                        <div className="header-control"></div>
                        <ReactResizeDetector
                            handleHeight
                            handleWidth
                            onResize={this.onResize}
                        >
                            <Content className="body-wrapper">
                                {children}
                            </Content>
                        </ReactResizeDetector>
                    </div>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isLogged: selectIsLogged(),
    errors: selectErrors(),
    loading: selectLoading()
});

const mapDispatchToProps = {
    verifyTokenFnc: verifyToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PrivateLayout));
