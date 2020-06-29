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
      const { accessToken, refreshToken, identity } = action.payload;
      openNotification(NOTIFICATION_TYPE.SUCCESS, "Login", "Login Success");
      return state
        .set("loading", false)
        .set("logged", true)
        .set("accessToken", accessToken)
        .set("refreshToken", refreshToken)
        .set("identity", identity)
        .set("challenge", "");
    }
    case types.LOGIN_FAILED: {
      const error = action.payload;
      const { message } = error;
      return state
        .set("loading", false)
        .set("errors", { serverLogin: message });
    }
    // aws require change pas
    case types.SERVER_CHALLENGE_CHANGEPASS: {
      const { challengeName } = action.payload;
      return state
        .set("loading", false)
        .set("challenge", challengeName)
        .set("userChangePass", action.payload);
    }
    case types.CHALLENGE_CHANGEPASS: {
      return state
        .set("loading", true)
        .set("logged", false)
        .set("accessToken", "")
        .set("refreshToken", "");
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
