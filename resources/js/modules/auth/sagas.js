import { fetchService } from "services";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { isEmptyString } from "helpers";
import * as types from "./constants";

import {
    loginSuccess,
    loginFailed,
    logoutSuccess,
    logoutFailed,
    getProfileSuccess,
    getProfileFailed
} from "./actions";
import { ROOT_API_URL } from "constants";

export default function* root() {
    yield all([
        watcherLogin(),
        watcherLogout(),
        watcherProfile()
    ]);
}

export function* watcherLogin() {
    yield takeLatest(types.LOGIN, loginSaga);
}

export function* watcherLogout() {
    yield takeLatest(types.LOGOUT, logoutSaga);
}

export function* watcherProfile() {
    yield takeLatest(types.GET_PROFILE, getProfile);
}

///////////////////////////////////////////////////// FUNCTIONS //////////////////

export function* loginSaga({ payload }) {
    const { username, password } = payload;
    const resp = yield call(requestLogin, username, password);
    const { data, status } = resp;
    if (status === 200) {
        //add this incase user have multiple organization, need to send request to Server
        fetchService.addTokenHeader(data);

        yield put(
            loginSuccess({
                username: username,
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
            })
        );
    } else {
        yield put(loginFailed(data));
    }
}

export function* logoutSaga() {
    const resp = yield call(requestLogout);

    const { data, status } = resp;
    if (status === 200) {
        fetchService.removeTokenHeader();
        yield put(logoutSuccess());
    } else {
        yield put(logoutFailed(data));
    }
}

export function* getProfile() {
    console.log('pass saga');
    const resp = yield call(requestGetProfile);
    const { data, status } = resp;
    console.log('data after request', data)
    if (status === 200) {
        yield put(getProfileSuccess(data));
    } else {
        yield put(getProfileFailed(data));
    }
}

///////////////////////////////////////////////////// REQUEST //////////////////

function requestLogin(username, password) {
    const data = {
        username,
        password
    }
    return fetchService
        .fetch(`${ROOT_API_URL}/api/oauth/login`, {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(([resp, status]) => {
            return {
                data: resp,
                status,
            };
        });
}

function requestLogout() { }

function requestGetProfile() {
    console.log('pass get profile request');
    return fetchService
        .fetch(`${ROOT_API_URL}/api/profile/me`, { method: "GET" })
        .then(([resp, status]) => {
            return {
                data: resp,
                status,
            };
        });
}
