import { all } from 'redux-saga/effects';

import { sharedSagas } from '../shared/react/store/sharedSaga';
import { activitySagas } from './activity/activityStore';
import { doneTodoSagas } from './doneTodo/doneTodoStore';
import { friendSagas } from './friend/friendStore';
import { todoSagas } from './todo/todoStore';

export function* sagas() {
  yield all([sharedSagas(), friendSagas(), todoSagas(), doneTodoSagas(), activitySagas()]);
}
