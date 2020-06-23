import * as actions from "./../actions";
import * as types from "./../constants";
describe("CHANGE_LOCAL_LANGUAGE", () => {
  it("language code setting", () => {
    const expectedAction = {
      type: types.CHANGE_LOCALE_LANGUAGE_SUCCESS,
      languageCode: "en"
    };
    expect(actions.changeLanguage("en")).toEqual(expectedAction);
  });
  it("language code setting null value", () => {
    const expectedAction = {
      type: types.CHANGE_LOCALE_LANGUAGE_SUCCESS,
      languageCode: ""
    };
    expect(actions.changeLanguage("")).toEqual(expectedAction);
  });
});
