import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';

import { routeHelpers } from '../../shared/react/routeHelpers';
import { friendActionCreators, friendActionTypes } from './friendActions';
import {
  createActivity,
  createFriend,
  createTodo,
  deleteActivity,
  deleteFriend,
  deleteTodo,
  fetchActivities,
  fetchDoneTodos,
  fetchFriends,
  fetchTodos,
  markTodoAsDone,
  markTodoAsUndone,
  updateActivity,
  updateFriend,
  updateTodo,
} from './friendNetwork';
import { friendSelectors } from './friendSelectors';

function* handleFetchFriendsRequested() {
  const friends = yield select(friendSelectors.getFriends);
  if (friends.length) {
    return;
  }

  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(fetchFriends);
  if (data) {
    yield put(friendActionCreators.fetchFriendsSuccedded(data));
  }

  yield put(friendActionCreators.isLoading(false));
}

function* makeSureFriendIsFetched(friendId) {
  let friend = yield select(friendSelectors.getFriend, friendId);
  if (!friend) {
    yield put(friendActionCreators.fetchFriendsRequested());
    yield take(friendActionTypes.FETCH_FRIENDS_SUCCEDDED);
    friend = yield select(friendSelectors.getFriend, friendId);
  }

  return friend;
}

function* handleCreateFriendPressed({ payload: { name, summary, email, phone, birthday } }) {
  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(createFriend, { name, summary, email, phone, birthday });
  if (data) {
    yield put(friendActionCreators.createFriendSuccedded(data));
    yield call(routeHelpers.goBack);
  }

  yield put(friendActionCreators.isLoading(false));
}

function* handleUpdateFriendPressed({
  payload: { friendId, name, summary, email, phone, birthday, position },
}) {
  const friend = yield call(makeSureFriendIsFetched, friendId);

  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(
    updateFriend,
    friendId,
    {
      name,
      summary,
      email,
      phone,
      birthday,
      position,
    },
    friend.decryptedPassword
  );
  if (data) {
    yield put(friendActionCreators.updateFriendSuccedded(friendId, data));
    yield call(routeHelpers.goBack);
  }

  yield put(friendActionCreators.isLoading(false));
}

function* handleDeleteFriendPressed({ payload: { friendId } }) {
  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(deleteFriend, friendId);
  if (data) {
    yield put(friendActionCreators.deleteFriendSuccedded(friendId));
    yield call(routeHelpers.goBack);
  }

  yield put(friendActionCreators.isLoading(false));
}

function* handleFetchActivitiesRequested({ payload: { friendId, startKey } }) {
  const friend = yield call(makeSureFriendIsFetched, friendId);
  if (!friend) {
    return;
  }

  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(fetchActivities, friendId, startKey, friend.decryptedPassword);
  if (data) {
    yield put(
      friendActionCreators.fetchActivitiesSuccedded(
        friendId,
        data.items,
        data.startKey,
        data.hasMore
      )
    );
  }

  yield put(friendActionCreators.isLoading(false));
}

function* handleCreateActivityPressed({ payload: { friendId, note, date } }) {
  const friend = yield call(makeSureFriendIsFetched, friendId);

  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(createActivity, friendId, { note, date }, friend.decryptedPassword);
  if (data) {
    yield put(friendActionCreators.createActivitySuccedded(friendId, data));
    yield call(routeHelpers.goBack);
  }

  yield put(friendActionCreators.isLoading(false));
}

function* handleUpdateActivityPressed({ payload: { friendId, activityId, note } }) {
  const friend = yield call(makeSureFriendIsFetched, friendId);

  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(
    updateActivity,
    friendId,
    activityId,
    { note },
    friend.decryptedPassword
  );
  if (data) {
    yield put(friendActionCreators.updateActivitySuccedded(friendId, activityId, data));
    yield call(routeHelpers.goBack);
  }

  yield put(friendActionCreators.isLoading(false));
}

function* handleDeleteActivityPressed({ payload: { friendId, activityId } }) {
  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(deleteActivity, friendId, activityId);
  if (data) {
    yield put(friendActionCreators.deleteActivitySuccedded(friendId, activityId));
  }

  yield put(friendActionCreators.isLoading(false));
}

function* handleFetchTodosRequested({ payload: { friendId } }) {
  const friend = yield call(makeSureFriendIsFetched, friendId);

  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(fetchTodos, friendId, friend.decryptedPassword);
  if (data) {
    yield put(friendActionCreators.fetchTodosSuccedded(friendId, data));
  }

  yield put(friendActionCreators.isLoading(false));
}

function* handleCreateTodoPressed({ payload: { friendId, title, note, date } }) {
  const friend = yield call(makeSureFriendIsFetched, friendId);

  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(
    createTodo,
    friendId,
    { title, note, date },
    friend.decryptedPassword
  );
  if (data) {
    yield put(friendActionCreators.createTodoSuccedded(friendId, data));
    yield call(routeHelpers.goBack);
  }

  yield put(friendActionCreators.isLoading(false));
}

function* handleUpdateTodoPressed({ payload: { friendId, todoId, title, note, date, position } }) {
  const friend = yield call(makeSureFriendIsFetched, friendId);

  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(
    updateTodo,
    friendId,
    todoId,
    { title, note, date, position },
    friend.decryptedPassword
  );
  if (data) {
    yield put(friendActionCreators.updateTodoSuccedded(friendId, todoId, data));
    yield call(routeHelpers.goBack);
  }

  yield put(friendActionCreators.isLoading(false));
}

function* handleDeleteTodoPressed({ payload: { friendId, todoId } }) {
  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(deleteTodo, friendId, todoId);
  if (data) {
    yield put(friendActionCreators.deleteTodoSuccedded(friendId, todoId));
  }

  yield put(friendActionCreators.isLoading(false));
}

function* handleFetchDoneTodosRequested({ payload: { friendId, startKey } }) {
  const friend = yield call(makeSureFriendIsFetched, friendId);

  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(fetchDoneTodos, friendId, startKey, friend.decryptedPassword);
  if (data) {
    yield put(
      friendActionCreators.fetchDoneTodosSuccedded(
        friendId,
        data.items,
        data.startKey,
        data.hasMore
      )
    );
  }

  yield put(friendActionCreators.isLoading(false));
}

function* handleMarkTodoAsDonePressed({ payload: { friendId, todoId } }) {
  const friend = yield call(makeSureFriendIsFetched, friendId);

  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(markTodoAsDone, friendId, todoId, friend.decryptedPassword);
  if (data) {
    yield put(friendActionCreators.markTodoAsDoneSuccedded(friendId, todoId, data));
  }

  yield put(friendActionCreators.isLoading(false));
}

function* handleMarkTodoAsUndonePressed({ payload: { friendId, todoId } }) {
  const friend = yield call(makeSureFriendIsFetched, friendId);

  yield put(friendActionCreators.isLoading(true));

  const { data } = yield call(markTodoAsUndone, friendId, todoId, friend.decryptedPassword);
  if (data) {
    yield put(friendActionCreators.markTodoAsUndoneSuccedded(friendId, todoId, data));
  }

  yield put(friendActionCreators.isLoading(false));
}

export function* friendSagas() {
  yield all([
    takeLatest(friendActionTypes.FETCH_FRIENDS_REQUESTED, handleFetchFriendsRequested),
    takeLatest(friendActionTypes.CREATE_FRIEND_PRESSED, handleCreateFriendPressed),
    takeLatest(friendActionTypes.UPDATE_FRIEND_PRESSED, handleUpdateFriendPressed),
    takeLatest(friendActionTypes.DELETE_FRIEND_PRESSED, handleDeleteFriendPressed),
    takeLatest(friendActionTypes.FETCH_ACTIVITIES_REQUESTED, handleFetchActivitiesRequested),
    takeLatest(friendActionTypes.CREATE_ACTIVITY_PRESSED, handleCreateActivityPressed),
    takeLatest(friendActionTypes.UPDATE_ACTIVITY_PRESSED, handleUpdateActivityPressed),
    takeLatest(friendActionTypes.DELETE_ACTIVITY_PRESSED, handleDeleteActivityPressed),
    takeLatest(friendActionTypes.FETCH_TODOS_REQUESTED, handleFetchTodosRequested),
    takeLatest(friendActionTypes.CREATE_TODO_PRESSED, handleCreateTodoPressed),
    takeLatest(friendActionTypes.UPDATE_TODO_PRESSED, handleUpdateTodoPressed),
    takeLatest(friendActionTypes.DELETE_TODO_PRESSED, handleDeleteTodoPressed),
    takeLatest(friendActionTypes.FETCH_DONE_TODOS_REQUESTED, handleFetchDoneTodosRequested),
    takeLatest(friendActionTypes.MARK_TODO_AS_DONE_PRESSED, handleMarkTodoAsDonePressed),
    takeLatest(friendActionTypes.MARK_TODO_AS_UNDONE_PRESSED, handleMarkTodoAsUndonePressed),
  ]);
}
