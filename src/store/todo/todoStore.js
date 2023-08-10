import { call, select } from 'redux-saga/effects';

import { makeSureFriendIsFetched } from '../friend/friendStore';
import { prepend, removeBySortKey, safeGet } from '../helper/object';
import {
  createDataSelectors,
  createGeneralStore,
  createRequest,
  mergeReducers,
  mergeSagas,
} from '../../shared/react/store/storeHelpers';
import {
  createTodo,
  deleteTodo,
  fetchTodo,
  fetchTodos,
  markTodoAsDone,
  markTodoAsUndone,
  updateTodo,
} from './todoNetwork';

export const todoDomain = 'todo';

const dataSelectors = createDataSelectors(todoDomain);

const { actions, selectors, reducer, saga } = createGeneralStore(todoDomain, {
  preFetchItems: function* ({ id }) {
    const todos = yield select(dataSelectors.getItems, id);
    const startKey = yield select(dataSelectors.getStartKey, id);
    if (todos.length && !startKey) {
      return { continueCall: false };
    }

    const friend = yield call(makeSureFriendIsFetched, id);
    if (!friend) {
      return { continueCall: false };
    }

    return { continueCall: true, result: friend };
  },
  fetchItems: async ({ id }, friend) => {
    return fetchTodos(id, friend.decryptedPassword);
  },
  preFetchItem: function* ({ id }) {
    const friend = yield call(makeSureFriendIsFetched, id);
    if (!friend) {
      return { continueCall: false };
    }

    return { continueCall: true, result: friend };
  },
  fetchItem: async ({ id, childId }, friend) => {
    return fetchTodo(id, childId, friend.decryptedPassword);
  },
  preCreateItem: function* ({ id }) {
    const friend = yield call(makeSureFriendIsFetched, id);
    if (!friend) {
      return { continueCall: false };
    }

    return { continueCall: true, result: friend };
  },
  createItem: async ({ id, title, note, date }, friend) => {
    return createTodo(id, { title, note, date }, friend.decryptedPassword);
  },
  preUpdateItem: function* ({ id }) {
    const friend = yield call(makeSureFriendIsFetched, id);
    if (!friend) {
      return { continueCall: false };
    }

    return { continueCall: true, result: friend };
  },
  updateItem: async ({ id, childId, title, note, date, position }, friend) => {
    return updateTodo(id, childId, { title, note, date, position }, friend.decryptedPassword);
  },
  deleteItem: async ({ id, childId }) => {
    return deleteTodo(id, childId);
  },
});

const markTodoAsDoneRequest = createRequest(todoDomain, 'markTodoAsDone', {
  onReducerSucceeded: (state, { payload: { id, childId } }) => {
    return removeBySortKey(state, ['data', id, 'items'], childId);
  },
  preRequest: function* ({ id }) {
    const friend = yield call(makeSureFriendIsFetched, id);
    if (!friend) {
      return { continueCall: false };
    }

    return { continueCall: true, result: friend };
  },
  request: async ({ id, childId }, friend) => {
    return markTodoAsDone(id, childId, friend.decryptedPassword);
  },
});

const markTodoAsUndoneRequest = createRequest(todoDomain, 'markTodoAsUndone', {
  onReducerSucceeded: (state, { data, payload: { id } }) => {
    const isLoaded = safeGet(state, ['fetchItems', id, 'isSuccessful']);
    return isLoaded ? prepend(state, ['data', id, 'items'], data) : state;
  },
  preRequest: function* ({ id }) {
    const friend = yield call(makeSureFriendIsFetched, id);
    if (!friend) {
      return { continueCall: false };
    }

    return { continueCall: true, result: friend };
  },
  request: async ({ id, childId }, friend) => {
    return markTodoAsUndone(id, childId, friend.decryptedPassword);
  },
});

export const todoActions = {
  ...actions,
  markTodoAsDone: markTodoAsDoneRequest.actions,
  markTodoAsUndone: markTodoAsUndoneRequest.actions,
};

export const todoSelectors = {
  ...selectors,
  data: dataSelectors,
  markTodoAsDone: markTodoAsDoneRequest.selectors,
  markTodoAsUndone: markTodoAsUndoneRequest.selectors,
};

export const todoReducer = mergeReducers([
  reducer,
  markTodoAsDoneRequest.reducer,
  markTodoAsUndoneRequest.reducer,
]);

export const todoSagas = mergeSagas([
  saga,
  markTodoAsDoneRequest.saga,
  markTodoAsUndoneRequest.saga,
]);
