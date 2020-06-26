import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "./core/App";

import "framework7/css/framework7.bundle.css";
import "assets/css/global.scss";

// Import Framework7 Core
import Framework7 from "framework7/framework7-lite.esm.bundle.js";

// Import Framework7 React
import Framework7React from "framework7-react";

// Init plugin
Framework7.use(Framework7React);

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
