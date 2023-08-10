import { call, select } from 'redux-saga/effects';

import { createDataSelectors, createGeneralStore } from '../../shared/react/store/storeHelpers';
import { makeSureFriendIsFetched } from '../friend/friendStore';
import {
  createActivity,
  deleteActivity,
  fetchActivities,
  fetchActivity,
  updateActivity,
} from './activityNetwork';

export const activityDomain = 'activity';

const dataSelectors = createDataSelectors(activityDomain);

const { actions, selectors, reducer, saga } = createGeneralStore(activityDomain, {
  preFetchItems: function* ({ id }) {
    const activities = yield select(dataSelectors.getItems, id);
    const startKey = yield select(dataSelectors.getStartKey, id);
    if (activities.length && !startKey) {
      return { continueCall: false };
    }

    const friend = yield call(makeSureFriendIsFetched, id);
    if (!friend) {
      return { continueCall: false };
    }

    return { continueCall: true, result: friend };
  },
  fetchItems: async ({ id, startKey }, friend) => {
    return fetchActivities(id, startKey, friend.decryptedPassword);
  },
  preFetchItem: function* ({ id }) {
    const friend = yield call(makeSureFriendIsFetched, id);
    if (!friend) {
      return { continueCall: false };
    }

    return { continueCall: true, result: friend };
  },
  fetchItem: async ({ id, childId }, friend) => {
    return fetchActivity(id, childId, friend.decryptedPassword);
  },
  preCreateItem: function* ({ id }) {
    const friend = yield call(makeSureFriendIsFetched, id);
    if (!friend) {
      return { continueCall: false };
    }

    return { continueCall: true, result: friend };
  },
  createItem: async ({ id, note, date }, friend) => {
    return createActivity(id, { note, date }, friend.decryptedPassword);
  },
  preUpdateItem: function* ({ id }) {
    const friend = yield call(makeSureFriendIsFetched, id);
    if (!friend) {
      return { continueCall: false };
    }

    return { continueCall: true, result: friend };
  },
  updateItem: async ({ id, childId, note }, friend) => {
    return updateActivity(id, childId, { note }, friend.decryptedPassword);
  },
  deleteItem: async ({ id, childId }) => {
    return deleteActivity(id, childId);
  },
});

export const activityActions = {
  fetchItemsRequested: actions.fetchItems.requested.action,
  fetchItemRequested: actions.fetchItem.requested.action,
  createRequested: actions.createItem.requested.action,
  updateRequested: actions.updateItem.requested.action,
  deleteRequested: actions.deleteItem.requested.action,
};

export const activitySelectors = {
  ...selectors,
  data: dataSelectors,
};

export const activityReducer = reducer;

export const activitySagas = saga;
