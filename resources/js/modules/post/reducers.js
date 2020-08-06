import { fromJS } from "immutable";
import { NOTIFICATION_TYPE } from "constants";
import * as types from "./constants";
import { openNotification } from "helpers";
import { fetchService } from "services";

const k = [];

export const initialState = fromJS({
  loading: false,
  posts: [],
  page: 0,
  errors: null,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.FETCH_POST: {
      const { payload } = action;
      if (payload.page === 1) {
        return state
        .set('loading', true)
        .set('posts', [])
        .set('page', 0);
      }
      return state
        .set('loading', true)
    }

    case types.FETCH_POST_SUCCESS: {
      const { data } = action.payload;
      if (data.length < 0)
        return state.set('loading', false);
      return state 
        .set('loading', false)
        .set('page', data.length>0?state.get('page') + 1:state.get('page'))
        .set('posts', data.length>0?[...state.get('posts'), ...data]:state.get('posts'))
    }

    case types.FETCH_POST_SUCCESS_NULL: {
      return state.set('loading', false);
    }

    default:
      return state;
  }
};

export default reducer;
