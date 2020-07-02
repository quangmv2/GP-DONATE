import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
// import authReducer from "../modules/auth/reducers";
import translates from "../modules/translates/reducers";

const createRootReducer = (history, injectedReducers) => {
  return combineReducers({
    // AUTH: authReducer,
    SYSTEM_TRANSLATE: translates,
    router: connectRouter(history),
    ...injectedReducers
  });
};

export default createRootReducer;
