import * as types from "./constants";

export const getPosts = (page) => {
  return {
    type: types.FETCH_POST,
    payload: {
      limit: types.LIMIT_POST,
      page
    },
  };
};

export const getPostsSuccess = (data) => {
  return {
    type: types.FETCH_POST_SUCCESS,
    payload: data,
  };
};

export const getPostsFailed = (error) => {
  return {
    type: types.FETCH_POST_FAILED,
    payload: error,
  };
};

export const getPostNull = () => {
  return {
    type: types.FETCH_POST_SUCCESS_NULL,
    payload: {}
  }
}