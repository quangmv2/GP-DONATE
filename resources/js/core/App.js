import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import { flatten } from "lodash";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import RouterContainer from "../core/router-container/RouterContainer";
import configureStore from "../redux/configureStore";
import privateRoutes from "../router/private";
import publicRoutes from "../router/public";
import {withSplashScreen} from '../components/PublicPages';
// import * as serviceWorker from "./serviceWorker";
import { SocketProvider } from "../context/SocketProvider";
import { ConnectedRouter } from "connected-react-router";
const App = props => {
    const initialState = {};
    const history = createBrowserHistory({
        // basename: "/" // config for base directory
    });
    const store = configureStore(initialState, history);
  
    return (
        <Provider store={store}>
        <SocketProvider>
            <ConnectedRouter history={history}>
                <RouterContainer
                    history={history}
                    publicRoutes={flatten(publicRoutes)}
                    privateRoutes={flatten(privateRoutes)}
                />
            </ConnectedRouter>
        </SocketProvider>
    </Provider>
      
    );
  }
export default withSplashScreen(App);