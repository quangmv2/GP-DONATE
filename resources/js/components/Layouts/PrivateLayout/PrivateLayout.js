import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { fetchService } from "services";
import {
    selectIsLogged,
    selectErrors,
    selectLoading
} from "modules/auth/selectors";
import { postLogout, getProfile } from "modules/auth/actions";

import ReactResizeDetector from "react-resize-detector";
import { createStructuredSelector } from "reselect";

import { ROUTE, TIME_INTERVAL_SESSION } from "constants";
import "./private-layout.scss";

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
    }

    async componentDidMount() {
        const accesstoken = localStorage.getItem("ACCESS_TOKEN");
        const refreshToken = localStorage.getItem("REFRESH_TOKEN");

        fetchService.addTokenHeader({ access_token: accesstoken });

        const { getProfileFnc } = this.props;
        console.log(accesstoken);
        if (accesstoken && accesstoken != "") {
            getProfileFnc();
        }

    }

    componentDidUpdate(prevProps) { }

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
    logout: postLogout,
    getProfileFnc: getProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateLayout);
