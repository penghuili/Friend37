import { all } from 'redux-saga/effects';

import { sharedSagas } from '../shared/react/store/sharedSaga';
import { friendSagas } from './friend/friendSagas';

export function* sagas() {
  yield all([sharedSagas(), friendSagas()]);
}
