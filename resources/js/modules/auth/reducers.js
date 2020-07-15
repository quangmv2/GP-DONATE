import { fromJS } from "immutable";
import { NOTIFICATION_TYPE } from "constants";
import * as types from "./constants";
import { openNotification } from "helpers";
// import { fetchService } from "services";

export const initialState = fromJS({
  loading: false,
  logged: false,
  accessToken: "",
  refreshToken: "",
  identity: null,
  challenge: "",
  userChangePass: null,
  userInfo: {}
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      localStorage.setItem("REFRESH_TOKEN", refreshToken);
      return state
        .set("loading", false)
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
    case types.GET_PROFILE: {
      console.log('pass reducer');
      return state
        .set("loading", true);
    }
    case types.GET_PROFILE_SUCCESS: {
      const { data } = action.payload;

      return state
        .set("loading", false)
        .set("userProfile", data);
    }
    case types.GET_PROFILE_FAILED: {
      const error = action.payload;
      const { message } = error;
      return state
        .set("loading", false)
        .set("errors", { serverLogin: message });
    }
    // set logged when come in to private layout
    case types.SET_LOGGED: {
      const { accessToken, refreshToken, identity } = action.payload;
      return state
        .set("loading", false)
        .set("logged", true)
        .set("accessToken", accessToken)
        .set("refreshToken", refreshToken)
        .set("identity", identity);
    }
    case types.LOGOUT: {
      return state.set("loading", true);
    }
    case types.LOGOUT_SUCCESS: {
      return state
        .set("loading", false)
        .set("logged", false)
        .set("accessToken", "")
        .set("refreshToken", "")
        .set("identity", null);
    }
    case types.LOGOUT_FAILED: {
      const error = action.payload;
      const { message } = error;
      return state
        .set("loading", false)
        .set("errors", { serverLogout: message });
    }
    default:
      return state;
  }
};

export default reducer;
