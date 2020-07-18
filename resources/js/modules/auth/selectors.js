import { createSelector } from "reselect";
import { FEATURE_NAME_AUTH } from "./constants";

const getAuthState = state => {
  return state[FEATURE_NAME_AUTH];
};
const selectUserInfo = () => 
  createSelector(getAuthState, state => state.get("userInfor"));

const selectErrors = () =>
  createSelector(getAuthState, state => state.get("errors"));

const selectAccessToken = () =>
  createSelector(getAuthState, state => state.get("accessToken"));


const selectRefreshToken = () =>
  createSelector(getAuthState, state => state.get("refreshToken"));

const selectIsLogged = () =>
  createSelector(getAuthState, state => state.get("logged"));

const selectIsLogout = () =>
  createSelector(getAuthState, state => state.get("logout"));

const selectLoading = () =>
  createSelector(getAuthState, state => state.get("loading"));

const selectChallenge = () => 
  createSelector(getAuthState, state => state.get("challenge"));

const selectUserChangePass = () =>
  createSelector(getAuthState, state => state.get("userChangePass"));


export {
  getAuthState,
  selectAccessToken,
  selectRefreshToken,
  selectErrors,
  selectIsLogged,
  selectIsLogout,
  selectLoading,
  selectChallenge,
  selectUserChangePass,
  selectUserInfo,
};
