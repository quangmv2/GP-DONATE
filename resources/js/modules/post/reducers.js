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
      return state
        .set('loading', true)
    }

    case types.FETCH_POST_SUCCESS: {
      console.log('red', action.payload);
      const { data } = action.payload;
      return state 
        .set('loading', false)
        .set('page', data.length>0?state.get('page') + 1:state.get('page'))
        .set('posts', data.length>0?[...state.get('posts'), ...data]:state.get('posts'))
    }

    default:
      return state;
  }
};

export default reducer;
