import reducer from "./../reducers";
import * as types from "./../constants";
import { fromJS } from "immutable";

describe("REDUCER MULTI-LANGUAGE", () => {
  const initialState = fromJS({
    languageCode: "en"
  });
  it("should return the initial state", () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });
  it("should Change Local language action", () => {
    const action = {
      type: types.CHANGE_LOCALE_LANGUAGE_SUCCESS,
      languageCode: "zh"
    };
    expect(reducer(initialState, action)).toEqual(
      fromJS({ languageCode: "zh" })
    );
  });
  it("should Change Local action null value", () => {
    const action = {
      type: types.CHANGE_LOCALE_LANGUAGE_SUCCESS,
      languageCode: ""
    };
    expect(reducer(initialState, action)).toEqual(fromJS({ languageCode: "" }));
  });
});
