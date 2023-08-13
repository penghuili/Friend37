import { call, put, select, take } from 'redux-saga/effects';

import {
  createDataSelectors,
  createGeneralStore,
  defaultId,
  mergeReducers,
} from '../../shared/react/store/storeHelpers';
import { updateBySortKey } from '../helper/object';
import {
  createFriend,
  deleteFriend,
  fetchFriend,
  fetchFriends,
  updateFriend,
} from './friendNetwork';

export const friendDomain = 'friend';

const dataSelectors = createDataSelectors(friendDomain);

export function* makeSureFriendIsFetched(friendId) {
  let friend = yield select(dataSelectors.getItem, undefined, friendId);
  if (!friend) {
    yield put({ type: `${friendDomain}/fetchItems/REQUESTED` });
    yield take(`${friendDomain}/fetchItems/SUCCEEDED`);
    friend = yield select(dataSelectors.getItem, undefined, friendId);
  }

  return friend;
}

const { actions, selectors, reducer, saga } = createGeneralStore(friendDomain, {
  preFetchItems: function* () {
    const friends = yield select(dataSelectors.getItems);
    return { continueCall: !friends.length };
  },
  fetchItems: async () => {
    return fetchFriends();
  },
  fetchItem: async ({ childId }) => {
    return fetchFriend(childId);
  },
  createItem: async ({ name, summary, email, phone, birthday }) => {
    return createFriend({ name, summary, email, phone, birthday });
  },
  preUpdateItem: function* ({ childId }) {
    const friend = yield call(makeSureFriendIsFetched, childId);
    if (!friend) {
      return { continueCall: false };
    }

    return { continueCall: true, result: friend };
  },
  updateItem: async ({ childId, name, summary, email, phone, birthday, position }, friend) => {
    return updateFriend(
      childId,
      { name, summary, email, phone, birthday, position },
      friend.decryptedPassword
    );
  },
  deleteItem: async ({ childId }) => {
    return deleteFriend(childId);
  },
});

const setTabType = `${friendDomain}/setTab`;
const customReducer = (state = {}, action) => {
  switch (action.type) {
    case setTabType:
      return updateBySortKey(state, ['data', defaultId, 'items'], action.payload.childId, {
        tab: action.payload.tab,
      });
    default:
      return state;
  }
};

export const friendActions = {
  fetchItemsRequested: actions.fetchItems.requested.action,
  fetchItemRequested: actions.fetchItem.requested.action,
  createRequested: actions.createItem.requested.action,
  updateRequested: actions.updateItem.requested.action,
  deleteRequested: actions.deleteItem.requested.action,
  setTab: (friendId, tab) => {
    return { type: setTabType, payload: { childId: friendId, tab } };
  },
};

export const friendSelectors = {
  ...selectors,
  data: {
    ...dataSelectors,
    getTab: (state, friendId) => {
      const friend = dataSelectors.getItem(state, undefined, friendId);
      return friend?.tab;
    },
  },
};

export const friendReducer = mergeReducers([reducer, customReducer]);

export const friendSagas = saga;