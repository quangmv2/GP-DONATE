import { createSelector } from "reselect";
import { FEATURE_NAME_POST } from "./constants";

const getPostState = state => {
  return state[FEATURE_NAME_POST];
};

const selectErrors = () =>
  createSelector(getPostState, state => state.get("errors"));
  
const selectLoading = () =>
  createSelector(getPostState, state => state.get("loading"));
  
const selectPage = () =>
  createSelector(getPostState, state => state.get("page"));
  
const selectPost = () =>
  createSelector(getPostState, state => state.get("posts"));

export {
  selectErrors,
  selectLoading,
  selectPage,
  selectPost
};
