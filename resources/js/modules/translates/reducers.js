import { fromJS } from "immutable";
import * as types from "./constants";
import Cookies from "js-cookie";
export const initialState = fromJS({
  languageCode: "en"
});
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_LOCALE_LANGUAGE_SUCCESS:
      Cookies.set("languageCode", action.languageCode);
      return state.set("languageCode", action.languageCode);
    case types.SWITCH_LANGUAGE_SUCCESS:
      Cookies.set("languageCode", action.payload.languageCode);
      //action.payload.autoRefresh && window.location.reload();
      return state.set("languageCode", action.payload.languageCode);
    default:
      return state;
  }
};

export default reducer;
