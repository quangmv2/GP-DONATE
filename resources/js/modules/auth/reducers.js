import { fromJS } from "immutable";
import { NOTIFICATION_TYPE } from "constants";
import { openNotification } from "helpers";
import * as types from "./constants";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/auth";
import { URL_REDIRECT_LOGIN } from "../../constants/variables";
// import { fetchService } from "services";

export const initialState = fromJS({
  loading: false,
  logged: false,
  logout: false,
  accessToken: "",
  refreshToken: "",
  identity: null,
  challenge: "",
  userChangePass: null,
  userInfo: {}
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP: {
      return state 
      .set("loading", true)
      .set("logged", false)
      .set("accessToken", "")
      .set("refreshToken", "");
    }
    case types.SIGNUP_SUCCESS: {
      const { accessToken, refreshToken } = action.payload;
      openNotification(NOTIFICATION_TYPE.SUCCESS, "Sign Up", "Sign Up Success");
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      return state
        .set("loading", false)
        .set("logged", true)
        .set("accessToken", accessToken)
        .set("refreshToken", refreshToken);
    }
    case types.SIGNUP_FAILED: {
      const error = action.payload;
      const { message } = error;
      return state
        .set("loading", false)
        .set("errors", { serverLogin: message });
    }
    case types.LOGIN: {
      return state
        .set("loading", true)
        .set("logged", false)
        .set("accessToken", "")
        .set("refreshToken", "");
    }
    case types.LOGIN_SUCCESS: {
      const { accessToken, refreshToken } = action.payload;
      openNotification(NOTIFICATION_TYPE.SUCCESS, "Login", "Login Success");
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      return state
        .set("loading", false)
        .set('logout', false)
        .set("logged", true)
        .set("accessToken", accessToken)
        .set("refreshToken", refreshToken);
    }
    case types.LOGIN_FAILED: {
      const error = action.payload;
      const { message } = error;
      return state
        .set("loading", false)
        .set("errors", { serverLogin: message });
    }

    // set logged when come in to private layout
    case types.SET_LOGGED: {
      const { accessToken, refreshToken } = action.payload;
      return state
        .set("loading", false)
        .set("logged", true)
        .set("accessToken", accessToken)
        .set("refreshToken", refreshToken)
    }

    case types.LOGOUT: {
      localStorage.removeItem(URL_REDIRECT_LOGIN)
      return state.set("loading", true);
    }
    case types.LOGOUT_SUCCESS: {
      openNotification(NOTIFICATION_TYPE.SUCCESS, "Logout", "Logout Success");
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(URL_REDIRECT_LOGIN);
      return state
        .set("loading", false)
        .set('logout', true)
        .set("logged", false)
        .set("accessToken", "")
        .set("refreshToken", "")
    }
    case types.LOGOUT_FAILED: {
      const error = action.payload;
      const { message } = error;
      return state
        .set("loading", false)
        .set("errors", { serverLogout: message });
    }

    case types.VERIFY_TOKEN: {
      return state
        .set("loading", true);
    }
    case types.VERIFY_TOKEN_SUCCESS: {
      const { accessToken, refreshToken, userInfor } = action.payload;
      console.log(userInfor);
      return state
        .set("loading", false)
        .set('logout', false)
        .set("logged", true)
        .set("accessToken", accessToken)
        .set("refreshToken", refreshToken)
        .set('userInfor', userInfor);
    }
    case types.VERIFY_TOKEN_FAILED: {
      const error = action.payload;
      const { message } = error;
      console.log(message);
      openNotification(NOTIFICATION_TYPE.ERROR, "Error", message);
      return state
        .set("loading", false)
        .set("logged", false)
        .set("errors", { serverLogin: message })
        .set('userInfor', {});
    }
    default:
      return state;
  }
};

export default reducer;
