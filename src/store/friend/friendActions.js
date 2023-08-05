export const friendActionTypes = {
  IS_LOADING: 'friend/IS_LOADING',
  FETCH_FRIENDS_REQUESTED: 'friend/FETCH_FRIENDS_REQUESTED',
  FETCH_FRIENDS_SUCCEDDED: 'friend/FETCH_FRIENDS_SUCCEDDED',
  CREATE_FRIEND_PRESSED: 'friend/CREATE_FRIEND_PRESSED',
  CREATE_FRIEND_SUCCEDDED: 'friend/CREATE_FRIEND_SUCCEDDED',
  UPDATE_FRIEND_PRESSED: 'friend/UPDATE_FRIEND_PRESSED',
  UPDATE_FRIEND_SUCCEDDED: 'friend/UPDATE_FRIEND_SUCCEDDED',
  DELETE_FRIEND_PRESSED: 'friend/DELETE_FRIEND_PRESSED',
  DELETE_FRIEND_SUCCEDDED: 'friend/DELETE_FRIEND_SUCCEDDED',
  FETCH_ACTIVITIES_REQUESTED: 'friend/FETCH_ACTIVITIES_REQUESTED',
  FETCH_ACTIVITIES_SUCCEDDED: 'friend/FETCH_ACTIVITIES_SUCCEDDED',
  CREATE_ACTIVITY_PRESSED: 'friend/CREATE_ACTIVITY_PRESSED',
  CREATE_ACTIVITY_SUCCEDDED: 'friend/CREATE_ACTIVITY_SUCCEDDED',
  UPDATE_ACTIVITY_PRESSED: 'friend/UPDATE_ACTIVITY_PRESSED',
  UPDATE_ACTIVITY_SUCCEDDED: 'friend/UPDATE_ACTIVITY_SUCCEDDED',
  DELETE_ACTIVITY_PRESSED: 'friend/DELETE_ACTIVITY_PRESSED',
  DELETE_ACTIVITY_SUCCEDDED: 'friend/DELETE_ACTIVITY_SUCCEDDED',
  FETCH_TODOS_REQUESTED: 'friend/FETCH_TODOS_REQUESTED',
  FETCH_TODOS_SUCCEDDED: 'friend/FETCH_TODOS_SUCCEDDED',
  CREATE_TODO_PRESSED: 'friend/CREATE_TODO_PRESSED',
  CREATE_TODO_SUCCEDDED: 'friend/CREATE_TODO_SUCCEDDED',
  UPDATE_TODO_PRESSED: 'friend/UPDATE_TODO_PRESSED',
  UPDATE_TODO_SUCCEDDED: 'friend/UPDATE_TODO_SUCCEDDED',
  DELETE_TODO_PRESSED: 'friend/DELETE_TODO_PRESSED',
  DELETE_TODO_SUCCEDDED: 'friend/DELETE_TODO_SUCCEDDED',
  FETCH_DONE_TODOS_REQUESTED: 'friend/FETCH_DONE_TODOS_REQUESTED',
  FETCH_DONE_TODOS_SUCCEDDED: 'friend/FETCH_DONE_TODOS_SUCCEDDED',
  MARK_TODO_AS_DONE_PRESSED: 'friend/MARK_TODO_AS_DONE_PRESSED',
  MARK_TODO_AS_DONE_SUCCEDDED: 'friend/MARK_TODO_AS_DONE_SUCCEDDED',
  MARK_TODO_AS_UNDONE_PRESSED: 'friend/MARK_TODO_AS_UNDONE_PRESSED',
  MARK_TODO_AS_UNDONE_SUCCEDDED: 'friend/MARK_TODO_AS_UNDONE_SUCCEDDED',
  SET_TAB: 'friend/SET_TAB',
};

export const friendActionCreators = {
  isLoading(value) {
    return { type: friendActionTypes.IS_LOADING, payload: { value } };
  },
  fetchFriendsRequested() {
    return { type: friendActionTypes.FETCH_FRIENDS_REQUESTED };
  },
  fetchFriendsSuccedded(friends) {
    return { type: friendActionTypes.FETCH_FRIENDS_SUCCEDDED, payload: { friends } };
  },
  createFriendPressed({ name, summary, email, phone, birthday }) {
    return {
      type: friendActionTypes.CREATE_FRIEND_PRESSED,
      payload: { name, summary, email, phone, birthday },
    };
  },
  createFriendSuccedded(friend) {
    return { type: friendActionTypes.CREATE_FRIEND_SUCCEDDED, payload: { friend } };
  },
  updateFriendPressed(friendId, { name, summary, email, phone, birthday, position, stayOnPage }) {
    return {
      type: friendActionTypes.UPDATE_FRIEND_PRESSED,
      payload: { friendId, name, summary, email, phone, birthday, position, stayOnPage },
    };
  },
  updateFriendSuccedded(friendId, friend) {
    return { type: friendActionTypes.UPDATE_FRIEND_SUCCEDDED, payload: { friendId, friend } };
  },
  deleteFriendPressed(friendId) {
    return { type: friendActionTypes.DELETE_FRIEND_PRESSED, payload: { friendId } };
  },
  deleteFriendSuccedded(friendId) {
    return { type: friendActionTypes.DELETE_FRIEND_SUCCEDDED, payload: { friendId } };
  },
  fetchActivitiesRequested(friendId, startKey) {
    return { type: friendActionTypes.FETCH_ACTIVITIES_REQUESTED, payload: { friendId, startKey } };
  },
  fetchActivitiesSuccedded(friendId, activities, startKey, hasMore) {
    return {
      type: friendActionTypes.FETCH_ACTIVITIES_SUCCEDDED,
      payload: { friendId, startKey, hasMore, activities },
    };
  },
  createActivityPressed(friendId, { note, date }) {
    return { type: friendActionTypes.CREATE_ACTIVITY_PRESSED, payload: { friendId, note, date } };
  },
  createActivitySuccedded(friendId, activity) {
    return {
      type: friendActionTypes.CREATE_ACTIVITY_SUCCEDDED,
      payload: { friendId, activity },
    };
  },
  updateActivityPressed(friendId, activityId, note) {
    return {
      type: friendActionTypes.UPDATE_ACTIVITY_PRESSED,
      payload: { friendId, activityId, note },
    };
  },
  updateActivitySuccedded(friendId, activityId, activity) {
    return {
      type: friendActionTypes.UPDATE_ACTIVITY_SUCCEDDED,
      payload: { friendId, activityId, activity },
    };
  },
  deleteActivityPressed(friendId, activityId) {
    return { type: friendActionTypes.DELETE_ACTIVITY_PRESSED, payload: { friendId, activityId } };
  },
  deleteActivitySuccedded(friendId, activityId) {
    return { type: friendActionTypes.DELETE_ACTIVITY_SUCCEDDED, payload: { friendId, activityId } };
  },
  fetchTodosRequested(friendId) {
    return { type: friendActionTypes.FETCH_TODOS_REQUESTED, payload: { friendId } };
  },
  fetchTodosSuccedded(friendId, todos) {
    return { type: friendActionTypes.FETCH_TODOS_SUCCEDDED, payload: { friendId, todos } };
  },
  createTodoPressed(friendId, { title, note, date }) {
    return {
      type: friendActionTypes.CREATE_TODO_PRESSED,
      payload: { friendId, title, note, date },
    };
  },
  createTodoSuccedded(friendId, todo) {
    return { type: friendActionTypes.CREATE_TODO_SUCCEDDED, payload: { friendId, todo } };
  },
  updateTodoPressed(friendId, todoId, { title, note, date, position }) {
    return {
      type: friendActionTypes.UPDATE_TODO_PRESSED,
      payload: { friendId, todoId, title, note, date, position },
    };
  },
  updateTodoSuccedded(friendId, todoId, todo) {
    return { type: friendActionTypes.UPDATE_TODO_SUCCEDDED, payload: { friendId, todoId, todo } };
  },
  deleteTodoPressed(friendId, todoId) {
    return { type: friendActionTypes.DELETE_TODO_PRESSED, payload: { friendId, todoId } };
  },
  deleteTodoSuccedded(friendId, todoId) {
    return { type: friendActionTypes.DELETE_TODO_SUCCEDDED, payload: { friendId, todoId } };
  },
  fetchDoneTodosRequested(friendId, startKey) {
    return { type: friendActionTypes.FETCH_DONE_TODOS_REQUESTED, payload: { friendId, startKey } };
  },
  fetchDoneTodosSuccedded(friendId, todos, startKey, hasMore) {
    return {
      type: friendActionTypes.FETCH_DONE_TODOS_SUCCEDDED,
      payload: { friendId, startKey, todos, hasMore },
    };
  },
  markTodoAsDonePressed(friendId, todoId) {
    return { type: friendActionTypes.MARK_TODO_AS_DONE_PRESSED, payload: { friendId, todoId } };
  },
  markTodoAsDoneSuccedded(friendId, todoId, doneTodo) {
    return {
      type: friendActionTypes.MARK_TODO_AS_DONE_SUCCEDDED,
      payload: { friendId, todoId, doneTodo },
    };
  },
  markTodoAsUndonePressed(friendId, todoId) {
    return { type: friendActionTypes.MARK_TODO_AS_UNDONE_PRESSED, payload: { friendId, todoId } };
  },
  markTodoAsUndoneSuccedded(friendId, todoId, todo) {
    return {
      type: friendActionTypes.MARK_TODO_AS_UNDONE_SUCCEDDED,
      payload: { friendId, todoId, todo },
    };
  },
  setTab(friendId, tab) {
    return { type: friendActionTypes.SET_TAB, payload: { friendId, tab } };
  },
};
