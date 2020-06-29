import Auth from "@aws-amplify/auth";
import { fetchService } from "services";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { isEmptyString } from "helpers";
import * as types from "./constants";

import {
    loginSuccess,
    loginFailed,
    logoutSuccess,
    logoutFailed,
    serverChallengePass
} from "./actions";

export default function* root() {
    yield all([watcherLogin(), watcherLogout()]);
}

export function* watcherLogin() {
    yield takeLatest(types.LOGIN, loginSaga);
}

export function* watcherLogout() {
    yield takeLatest(types.LOGOUT, logoutSaga);
}

///////////////////////////////////////////////////// FUNCTIONS //////////////////

export function* loginSaga({ payload }) {
    const { username, password } = payload;
    const resp = yield call(requestLogin, username, password);
    const { data, status } = resp;
    if (status === 200) {
        /** @type {CognitoUserSession} */
        //add this incase user have multiple organization, need to send request to Server
        fetchService.addTokenHeader(signInUserSession);

        yield put(
            loginSuccess({
                accessToken: signInUserSession.accessToken.jwtToken,
                refreshToken: signInUserSession.refreshToken.token,
                identity: attributes
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

///////////////////////////////////////////////////// REQUEST //////////////////

function requestLogin(username, password) {
    return Auth.signIn(username, password)
        .then(success => {
            return {
                data: success /** @type {CognitoUser} */,
                status: 200
            };
        })
        .catch(err => {
            return {
                data: err,
                status: 400
            };
        });
}

function requestLogout() {
    return Auth.signOut()
        .then(success => {
            return {
                data: success,
                status: 200
            };
        })
        .catch(err => console.log(err));
}
