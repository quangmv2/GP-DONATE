import * as types from "./constants";

export const postLogin = (username, password) => {
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

export const verifyToken = (accessToken, refreshToken) => {
  return {
    type: types.VERIFY_TOKEN,
    payload: {
      accessToken,
      refreshToken
    }
  };
};

export const verifyTokenSuccess = (data) => {
  return {
    type: types.VERIFY_TOKEN_SUCCESS,
    payload: data,
  };
};

export const verifyTokenFailed = (error) => {
  return {
    type: types.VERIFY_TOKEN_FAILED,
    payload: error,
  };
};

export const postSignUp = (username, email, password) => {
  return {
    type: types.SIGN_UP,
    payload: {
      username: username,
      email: email,
      password: password
    }
  }
};
export const signUpSuccess = (data) => {
  return {
    type: types.SIGNUP_SUCCESS,
    payload: data
  }
};

export const signUpFailed = (error) => {
  return {
    type: types.SIGNUP_FAILED,
    payload: error
  }
};