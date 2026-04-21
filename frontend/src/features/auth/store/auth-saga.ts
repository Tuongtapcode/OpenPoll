import { call, put, takeLatest } from 'redux-saga/effects';
import authService from '../services/auth-service';
import {
  loginTrigger,
  loginSuccess,
  loginFailure,
  registerTrigger,
  registerSuccess,
  registerFailure,
  getMeTrigger,
  getMeSuccess,
  getMeFailure,
} from './auth-slice';
import { IAuthResponse } from '../types';
import { PayloadAction } from '@reduxjs/toolkit';
import { ILoginPayload, IRegisterPayload } from '../types';

function* loginSaga(action: PayloadAction<ILoginPayload>): Generator {
  try {
    const data = (yield call(authService.login, action.payload)) as IAuthResponse;
    localStorage.setItem('openpoll_token', data.token);
    yield put(loginSuccess({ user: data.user, token: data.token }));
  } catch (error: any) {
    const message = error.response?.data?.message || 'Login failed';
    yield put(loginFailure(message));
  }
}

function* registerSaga(action: PayloadAction<IRegisterPayload>): Generator {
  try {
    const data = (yield call(authService.register, action.payload)) as IAuthResponse;
    localStorage.setItem('openpoll_token', data.token);
    yield put(registerSuccess({ user: data.user, token: data.token }));
  } catch (error: any) {
    const message = error.response?.data?.message || 'Registration failed';
    yield put(registerFailure(message));
  }
}

function* getMeSaga(): Generator {
  try {
    const data = (yield call(authService.getMe)) as { user: IAuthResponse['user'] };
    yield put(getMeSuccess(data.user));
  } catch {
    yield put(getMeFailure());
  }
}

export default function* authSaga() {
  yield takeLatest(loginTrigger.type, loginSaga);
  yield takeLatest(registerTrigger.type, registerSaga);
  yield takeLatest(getMeTrigger.type, getMeSaga);
}
