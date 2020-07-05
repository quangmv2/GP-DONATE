import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { renderRoutes } from "react-router-config";
import { Route, Switch, matchPath } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { openNotification } from "helpers";

import saga from "modules/auth/sagas";
import reducer from "modules/auth/reducers";
import injectReducer from "core/reducer/inject-reducer";
import injectSaga from "core/saga/inject-saga";
import { FEATURE_NAME_AUTH } from "modules/auth/constants";

// AWS cognito

// import { PublicLayout, PrivateLayout } from "components/Layouts";
import PublicLayout from "components/Layouts/PublicLayout/PublicLayout";
import PrivateLayout from "components/Layouts/PrivateLayout/PrivateLayout";
import { NotFoundPage } from "components/ErrorPages";

import { changeLanguage } from "modules/translates/actions";
import { getLanguageCode } from "modules/translates/selectors";
import languageObject from "modules/translates";
import { setLogged } from "modules/auth/actions";
import { IntlProvider } from "react-intl";

import { authCognitoService } from "services";

import {
    LANGUAGE_CODE_DEFAULT,
    AUTH_COGNITO_CONFIG,
    NOTIFICATION_TYPE,
    THEME
} from "constants";

import "antd/dist/antd.css";
import "assets/icons/style.css";
import "assets/css/global.scss";
import { LIGHT } from "constants";

export const flattenMessages = (nestedMessages, prefix = "") => {
    if (!nestedMessages || nestedMessages === null) {
        return {};
    }
    return Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "string") {
            Object.assign(messages, { [prefixedKey]: value });
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }
        return messages;
    }, {});
};

//init cognito

class RouterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            isPrivateRoute: false,
            isPublicRoute: false,
            authData: null,
            authError: {}
        };
    }

    async componentDidMount() {
        const { language, requestChangeLanguage } = this.props;
        const languageCodeCookie = Cookies.get("languageCode");
        const languageFinal = languageCodeCookie
            ? languageCodeCookie
            : language;
        requestChangeLanguage(languageFinal);

        if (this.isPrivateRoutes()) {
            this.setState({
                isPrivateRoute: true,
                isPublicRoute: false
            });
        }

        if (this.isPublicRoutes()) {
            this.setState({
                isPublicRoute: true,
                isPrivateRoute: false
            });
        }

        this.unlisten = this.props.history.listen(this.onHistoryChange);

        //set theme
        const root = document.documentElement;
        root.classList.add(localStorage.getItem(THEME) ?? LIGHT);
    }

    componentWillUnmount() {
        this.unlisten();
    }

    onHistoryChange = () => {
        if (this.isPrivateRoutes()) {
            this.setState({
                isPrivateRoute: true,
                isPublicRoute: false
            });
        }

        if (this.isPublicRoutes()) {
            this.setState({
                isPublicRoute: true,
                isPrivateRoute: false
            });
        }
    };

    isPrivateRoutes = () => {
        const { pathname } = this.props.history.location;
        const { privateRoutes } = this.props;
        let result = null;
        for (let index = 0; index < privateRoutes.length; index++) {
            if (matchPath(pathname, privateRoutes[index])) {
                result = matchPath(pathname, privateRoutes[index]);
                break;
            }
        }
        return result ? result.isExact : false;
    };

    isPublicRoutes = () => {
        const { pathname } = this.props.history.location;
        const { publicRoutes = [] } = this.props;

        let result = null;
        let routes = [...publicRoutes];

        for (let index = 0; index < routes.length; index++) {
            if (matchPath(pathname, routes[index])) {
                result = matchPath(pathname, routes[index]);
                break;
            }
        }
        return result ? result.isExact : false;
    };

    render() {
        const {
            history,
            privateRoutes,
            publicRoutes,
            language,
            requestChangeLanguage
        } = this.props;
        const { isPrivateRoute, isPublicRoute } = this.state;
        return (
            <React.Fragment>
                <IntlProvider
                    locale={language}
                    messages={flattenMessages(languageObject[language])}
                >
                    <Switch>
                        {isEmpty([...privateRoutes, ...publicRoutes]) ? (
                            <Route component={NotFoundPage} exact path="/" />
                        ) : (
                            <>
                                {isPrivateRoute && (
                                    <PrivateLayout
                                        changeLanguage={requestChangeLanguage}
                                        history={history}
                                        language={language}
                                    >
                                        {renderRoutes(privateRoutes)}
                                    </PrivateLayout>
                                )}

                                {isPublicRoute && (
                                    <PublicLayout>
                                        {renderRoutes(publicRoutes)}
                                    </PublicLayout>
                                )}

                                {!(isPrivateRoute || isPublicRoute) && (
                                    <Route component={NotFoundPage} path="*" />
                                )}
                            </>
                        )}
                    </Switch>
                </IntlProvider>
            </React.Fragment>
        );
    }
}

RouterContainer.propTypes = {
    locale: PropTypes.string,
    language: PropTypes.string,
    requestChangeLanguage: PropTypes.func
};

RouterContainer.defaultProps = {
    locale: LANGUAGE_CODE_DEFAULT
};
const mapStateToProps = createStructuredSelector({
    language: getLanguageCode()
});

const mapDispatchToProps = {
    requestChangeLanguage: languageCode => changeLanguage(languageCode),
    setLogged: setLogged
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: FEATURE_NAME_AUTH, reducer });

const withSaga = injectSaga({
    key: FEATURE_NAME_AUTH,
    saga
});

RouterContainer.propTypes = {
    privateRoutes: PropTypes.array,
    publicRoutes: PropTypes.array
};

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter
)(RouterContainer);
