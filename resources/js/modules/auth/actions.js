import * as types from "./constants";

export const postLogin = (username, password) => {
  console.log('pass action');
  return {
    type: types.LOGIN,
    payload: {
      username,
      password,
    },
  };
};

export const loginSuccess = (data) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailed = (error) => {
  return {
    type: types.LOGIN_FAILED,
    payload: error,
  };
};

export const getProfile = () => {
  console.log('pass action');
  return {
    type: types.GET_PROFILE,
  };
};

export const getProfileSuccess = (data) => {
  return {
    type: types.GET_PROFILE_SUCCESS,
    payload: data,
  };
};

export const getProfileFailed = (error) => {
  return {
    type: types.GET_PROFILE_FAILED,
    payload: error,
  };
};

export const setLogged = (data) => {
  return {
    type: types.SET_LOGGED,
    payload: data,
  };
};



export const postLogout = () => {
  return {
    type: types.LOGOUT,
  };
};

export const logoutSuccess = (data) => {
  return {
    type: types.LOGOUT_SUCCESS,
    payload: data,
  };
};

export const logoutFailed = (error) => {
  return {
    type: types.LOGOUT_FAILED,
    payload: error,
  };
};
