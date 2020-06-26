import * as types from "./constants";

export const postLogin = ( username, password ) => {
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

export const serverChallengePass = (data) => {
  return {
    type: types.SERVER_CHALLENGE_CHANGEPASS,
    payload: data,
  };
};

export const postChallengeChangePass = (user, password) =>{
  return {
    type: types.CHALLENGE_CHANGEPASS,
    payload: {
      user,
      password
    }
  }
}

export const setLogged = (data) => {
  return {
    type: types.SET_LOGGED,
    payload: data,
  };
};

export const postLogout = ( ) => {
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
