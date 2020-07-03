import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { isDevelopEnv } from "helpers";
const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}, history) => {
  const middleware = [sagaMiddleware, routerMiddleware(history)];
  if (isDevelopEnv)
    middleware.push(logger);
  const enhancers = [applyMiddleware(...middleware)];
  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
      typeof window === "object" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
        trace: true,
        traceLimit: 25
      })
      : compose;

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(...enhancers)
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createRootReducer(history, store.injectedReducers));
    });
  }

  return store;
};

export default configureStore;
