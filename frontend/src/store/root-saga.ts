import { all, fork } from 'redux-saga/effects';
import { authSaga } from '@/features/auth/store';
import { pollSaga } from '@/features/poll/store';
import { voteSaga } from '@/features/vote/store';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(pollSaga),
    fork(voteSaga),
  ]);
}
