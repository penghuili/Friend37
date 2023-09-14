import { call } from 'redux-saga/effects';

import { prepend, removeBySortKey, safeGet } from '../../shared/js/object';
import {
  createDataSelectors,
  createRequest,
  mergeReducers,
  updateItems,
} from '../../shared/react/store/storeHelpers';
import { makeSureFriendIsFetched } from '../friend/friendStore';
import { todoActions } from '../todo/todoStore';
import { fetchDoneTodos } from './doneTodoNetwork';

export const doneTodoDomain = 'doneTodo';

const { actions, selectors, reducer, saga } = createRequest(doneTodoDomain, 'fetchDoneTodos', {
  onReducerSucceeded: (state, payload) => updateItems(state, payload),
  preRequest: function* ({ id }) {
    const friend = yield call(makeSureFriendIsFetched, id);
    if (!friend) {
      return { continueCall: false };
    }

    return { continueCall: true, result: friend };
  },
  request: async ({ id, startKey }, friend) => {
    return fetchDoneTodos(id, startKey, friend.decryptedPassword);
  },
});

function customReducer(state, action) {
  switch (action.type) {
    case todoActions.markTodoAsDone.succeeded.type: {
      const {
        data,
        payload: { id },
      } = action.payload;
      const isLoaded = safeGet(state, ['fetchDoneTodos', id, 'isSuccessful']);
      return isLoaded ? prepend(state, ['data', id, 'items'], data) : state;
    }
    case todoActions.markTodoAsUndone.succeeded.type: {
      const {
        payload: { id, itemId },
      } = action.payload;
      return removeBySortKey(state, ['data', id, 'items'], itemId);
    }
    case todoActions.deleteItem.succeeded.type: {
      const {
        payload: { id, itemId },
      } = action.payload;
      return removeBySortKey(state, ['data', id, 'items'], itemId);
    }
    default:
      return state;
  }
}

export const doneTodoActions = { fetchItems: actions };

export const doneTodoSelectors = {
  data: createDataSelectors(doneTodoDomain),
  fetchDoneTodos: selectors,
};

export const doneTodoReducer = mergeReducers([reducer, customReducer]);

export const doneTodoSagas = saga;
