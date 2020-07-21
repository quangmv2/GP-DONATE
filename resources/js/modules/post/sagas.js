import { fetchService } from "services";
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";

import { getPostsSuccess, getPostsFailed } from "./actions";
import { ROOT_API_URL } from "constants";
import { GET_POST } from "../../constants/routes";

export default function* root() {
    yield all([
        watchFetchPost(),
    ]);
}

export function* watchFetchPost() {
    yield takeLatest(types.FETCH_POST, fetchPosts);
}

///////////////////////////////////////////////////// FUNCTIONS //////////////////

export function* fetchPosts({ payload: {page, limit} }) {
    const res = yield call(requestPost, page, limit);
    const {data, status} = res;
    if (status === 200) {
        if (data.data.length < 1) return;
        yield put(getPostsSuccess({
            data : data.data.map(item => ({...item}))
        }))
    } else {
        yield put(getPostsFailed(data))
    }
}

///////////////////////////////////////////////////// REQUEST //////////////////

const requestPost = (page, limit) => {
    return fetchService
        .fetch(`${ROOT_API_URL}${GET_POST}?limit=${limit}&page=${page}`, {
            method: "GET",
        })
        .then(([resp, status]) => {
            return {
                data: resp,
                status,
            };
        });
}