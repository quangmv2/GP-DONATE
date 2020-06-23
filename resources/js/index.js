import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { flatten } from "lodash";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import RouterContainer from "./core/router-container/RouterContainer";
import configureStore from "./redux/configureStore";
import privateRoutes from "./router/private";
import publicRoutes from "./router/public";

import { ConnectedRouter } from "connected-react-router";
// import App from "./App";
const initialState = {};
const history = createBrowserHistory({
    // basename: "/" // config for base directory
});
const store = configureStore(initialState, history);

if (document.getElementById("root")) {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <RouterContainer
                    history={history}
                    publicRoutes={flatten(publicRoutes)}
                    privateRoutes={flatten(privateRoutes)}
                />
            </ConnectedRouter>
        </Provider>,
        document.getElementById("root")
    );
}
