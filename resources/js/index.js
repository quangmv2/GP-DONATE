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
import App from "../js/core/App";
// import * as serviceWorker from "./serviceWorker";
import { ConnectedRouter } from "connected-react-router";

const initialState = {};
const history = createBrowserHistory({
    // basename: "/" // config for base directory
});
const store = configureStore(initialState, history);

// ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(
    //đây là thng app luôn ddaay 
    <App />,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
