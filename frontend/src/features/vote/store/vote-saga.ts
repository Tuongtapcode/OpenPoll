import { call, put, takeLatest } from 'redux-saga/effects';
import voteService from '../services/vote-service';
import {
  submitVoteTrigger,
  submitVoteSuccess,
  submitVoteFailure,
} from './vote-slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { IVotePayload, IVoteResult } from '../types';

function* submitVoteSaga(action: PayloadAction<IVotePayload>): Generator {
  try {
    const data = (yield call(voteService.submitVote, action.payload)) as IVoteResult;
    yield put(submitVoteSuccess(data));
  } catch (error: any) {
    yield put(submitVoteFailure(error.response?.data?.message || 'Failed to submit vote'));
  }
}

export default function* voteSaga() {
  yield takeLatest(submitVoteTrigger.type, submitVoteSaga);
}
