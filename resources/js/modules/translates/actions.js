import * as types from "./constants";

export const changeLanguage = languageCode => {
  return { type: types.CHANGE_LOCALE_LANGUAGE_SUCCESS, languageCode };
};

export const switchLanguage = (languageCode, autoRefresh = true) => {
  return {
    type: types.SWITCH_LANGUAGE_SUCCESS,
    payload: { languageCode, autoRefresh }
  };
};
