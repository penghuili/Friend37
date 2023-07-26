import { combineReducers } from 'redux';

import { sharedReducer } from '../shared/react/store/sharedReducer';
import { friendReducer } from './friend/friendReducer';

export const reducers = combineReducers({
  shared: sharedReducer,
  friends: friendReducer,
});
