import { call, put, takeLatest } from 'redux-saga/effects';
import pollService from '../services/poll-service';
import {
  createPollTrigger, createPollSuccess, createPollFailure,
  fetchPollsTrigger, fetchPollsSuccess, fetchPollsFailure,
  fetchPollByIdTrigger, fetchPollByIdSuccess, fetchPollByIdFailure,
  closePollTrigger, closePollSuccess, closePollFailure,
  deletePollTrigger, deletePollSuccess, deletePollFailure,
} from './poll-slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ICreatePollPayload, IPoll } from '../types';

function* createPollSaga(action: PayloadAction<ICreatePollPayload>): Generator {
  try {
    const data = (yield call(pollService.create, action.payload)) as { poll: IPoll };
    yield put(createPollSuccess(data.poll));
  } catch (error: any) {
    yield put(createPollFailure(error.response?.data?.message || 'Failed to create poll'));
  }
}

function* fetchPollsSaga(): Generator {
  try {
    const data = (yield call(pollService.getMyPolls)) as { polls: IPoll[]; count: number };
    yield put(fetchPollsSuccess(data.polls));
  } catch (error: any) {
    yield put(fetchPollsFailure(error.response?.data?.message || 'Failed to fetch polls'));
  }
}

function* fetchPollByIdSaga(action: PayloadAction<string>): Generator {
  try {
    const data = (yield call(pollService.getById, action.payload)) as { poll: IPoll };
    yield put(fetchPollByIdSuccess(data.poll));
  } catch (error: any) {
    yield put(fetchPollByIdFailure(error.response?.data?.message || 'Failed to fetch poll'));
  }
}

function* closePollSaga(action: PayloadAction<string>): Generator {
  try {
    const data = (yield call(pollService.close, action.payload)) as { poll: IPoll };
    yield put(closePollSuccess(data.poll));
  } catch (error: any) {
    yield put(closePollFailure(error.response?.data?.message || 'Failed to close poll'));
  }
}

function* deletePollSaga(action: PayloadAction<string>): Generator {
  try {
    yield call(pollService.delete, action.payload);
    yield put(deletePollSuccess(action.payload));
  } catch (error: any) {
    yield put(deletePollFailure(error.response?.data?.message || 'Failed to delete poll'));
  }
}

export default function* pollSaga() {
  yield takeLatest(createPollTrigger.type, createPollSaga);
  yield takeLatest(fetchPollsTrigger.type, fetchPollsSaga);
  yield takeLatest(fetchPollByIdTrigger.type, fetchPollByIdSaga);
  yield takeLatest(closePollTrigger.type, closePollSaga);
  yield takeLatest(deletePollTrigger.type, deletePollSaga);
}
