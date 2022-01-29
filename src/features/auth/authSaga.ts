import { fork, take } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authAction, LoginPayload } from './authSlice';
import { delay, call, put } from '@redux-saga/core/effects';
import { push } from 'connected-react-router';

function* handleleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    localStorage.setItem('access_token', 'fake_token');
    yield put(
      authAction.loginSuccess({
        id: 1,
        name: 'Huy',
      })
    );

    yield put(push('/admin'));
  } catch (error) {
    yield put(authAction.loginFailed());
  }
}

function* handleleLogout() {
  yield delay(1000);
  localStorage.removeItem('access_token');
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authAction.login.type);
      yield fork(handleleLogin, action.payload);
    }

    yield take(authAction.logout.type);
    yield call(handleleLogout);
    // fork thi se chay luon vao while
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
