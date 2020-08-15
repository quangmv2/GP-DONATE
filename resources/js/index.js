import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import configureStore from "./redux/configureStore";
import App from "../js/core/App";

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
