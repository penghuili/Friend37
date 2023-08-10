import { combineReducers } from 'redux';

import { sharedReducer } from '../shared/react/store/sharedReducer';
import { activityDomain, activityReducer } from './activity/activityStore';
import { doneTodoDomain, doneTodoReducer } from './doneTodo/doneTodoStore';
import { friendDomain, friendReducer } from './friend/friendStore';
import { todoDomain, todoReducer } from './todo/todoStore';

export const reducers = combineReducers({
  shared: sharedReducer,
  [friendDomain]: friendReducer,
  [todoDomain]: todoReducer,
  [doneTodoDomain]: doneTodoReducer,
  [activityDomain]: activityReducer,
});
