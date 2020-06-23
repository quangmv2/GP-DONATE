import { createSelector } from "reselect";
import { routeReducer } from "./../router-reducer";

const { initialState } = routeReducer;
const getState = state => state.get("ROUTE", initialState);

const selectLocation = () =>
    createSelector(getState, state => state.get("location").toJS());

const selectPathname = () =>
    createSelector(getState, state => state.get("location").pathname);

export { selectLocation, selectPathname };
