import { fetchService } from "services";
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import { NOTIFICATION_TYPE } from "constants";
import { openNotification } from "helpers";

import {
    loginSuccess,
    loginFailed,
    logoutSuccess,
    logoutFailed,
    verifyTokenSuccess,
    verifyTokenFailed,
    signUpFailed,
    signUpSuccess
} from "./actions";
import { ROOT_API_URL } from "constants";

export default function* root() {
    yield all([
        watchSignUp(),
        watcherLogin(),
        watcherLogout(),
        watchVerifyToken(),
    ]);
}

export function* watchSignUp() {
    yield takeLatest(types.SIGN_UP, signUp);
}

export function* watchVerifyToken() {
    yield takeLatest(types.VERIFY_TOKEN, verifyToken);
}

export function* watcherLogin() {
    yield takeLatest(types.LOGIN, loginSaga);
}

export function* watcherLogout() {
    yield takeLatest(types.LOGOUT, logoutSaga);
}


///////////////////////////////////////////////////// FUNCTIONS //////////////////

export function* signUp({ payload }) {
    const { username, email, password } = payload;
    const resp = yield call(resquestSignUp, username, email, password );
    const { data, status } = resp;
    if (status === 200 ) {
        fetchService.addTokenHeader(data);
        yield put(
            signUpSuccess({
               accessToken: data.access_token,
               refreshToken: data.refresh_token,
            })
        );
    }
    if ( status === 422) {
        const { errors } = data;
        const keys = Object.keys(errors);
        keys.forEach(key => {
            errors[key].forEach(err => openNotification(NOTIFICATION_TYPE.ERROR, "Error", err))
        });
        yield put(signUpFailed(data));
    }
    else {
        yield put(signUpFailed(data));
    }
}

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

export function* verifyToken(accessToken, refreshToken) {
    const resp = yield call(requestVerifyToken);
    const { data, status } = resp;
    if (status === 200) {
        yield put(verifyTokenSuccess({userInfor: {...data}, accessToken, refreshToken}));
    } else {
        yield put(verifyTokenFailed(data));
    }
}

///////////////////////////////////////////////////// REQUEST //////////////////

function resquestSignUp(username, email, password) {
    const data = {
        username,
        email,
        password
    }
    return fetchService
    .fetch(`${ROOT_API_URL}/api/oauth/register`, {
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

function requestLogout() {
    return fetchService
        .fetch(`${ROOT_API_URL}/api/oauth/logout`, { method: "DELETE" })
        .then(([resp, status]) => {
            return {
                data: resp,
                status,
            };
        });
}

function requestVerifyToken() {
    return fetchService
        .fetch(`${ROOT_API_URL}/api/profile/me`, { method: "GET" })
        .then(([resp, status]) => {
            return {
                data: resp,
                status,
            };
        });
}
