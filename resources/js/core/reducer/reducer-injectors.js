import checkStore from "./../../redux/checkStore";
import createReducer from "./../../redux/reducers";

export function injectReducerFactory(store,history, isValid) {
  return function injectReducer(key, reducer) {
    if (!isValid) checkStore(store);
    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(history, store.injectedReducers));
  };
}

export default function getInjectors(store, history) {
  checkStore(store);
  return {
    injectReducer: injectReducerFactory(store,history, true)
  };
}
