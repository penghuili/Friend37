import { orderByPosition } from '../../shared/js/position';
import { uniqByKey } from '../../shared/js/uniq';
import { sharedActionTypes } from '../../shared/react/store/sharedActions';
import { friendActionTypes } from './friendActions';

const initialState = {
  isLoading: false,
  friends: [],
};

function handleIsLoading(state, { value }) {
  return { ...state, isLoading: value };
}

function handleReset() {
  return initialState;
}

function handleFetchFriendsSucceeded(state, { friends }) {
  return { ...state, friends };
}

function handleCreateFriendSucceeded(state, { friend }) {
  return { ...state, friends: [friend, ...state.friends] };
}

function handleUpdateFriendSuccedded(state, { friendId, friend }) {
  const friends = state.friends.map(f => (f.sortKey === friendId ? friend : f));
  return { ...state, friends: orderByPosition(friends) };
}

function handleDeleteFriendSuccedded(state, { friendId }) {
  const friends = state.friends.filter(f => f.sortKey !== friendId);
  return { ...state, friends };
}

function handleFetchActivitiesSucceeded(state, { friendId, startKey, hasMore, activities }) {
  const friends = state.friends.map(f => {
    if (f.sortKey === friendId) {
      const newActivities = uniqByKey([...f.activities, ...activities], 'sortKey');
      return {
        ...f,
        activities: newActivities,
        activitiesStartKey: startKey,
        hasMoreActivities: hasMore,
      };
    }
    return f;
  });

  return { ...state, friends };
}

function handleCreateActivitySucceeded(state, { friendId, activity }) {
  const friends = state.friends.map(f => {
    if (f.sortKey === friendId) {
      const newActivities = [activity, ...f.activities];
      return { ...f, activities: newActivities };
    }
    return f;
  });

  return { ...state, friends };
}

function handleUpdateActivitySucceeded(state, { friendId, activityId, activity }) {
  const friends = state.friends.map(f => {
    if (f.sortKey === friendId) {
      const newActivities = f.activities.map(a => (a.sortKey === activityId ? activity : a));
      return { ...f, activities: newActivities };
    }
    return f;
  });

  return { ...state, friends };
}

function handleDeleteActivitySucceeded(state, { friendId, activityId }) {
  const friends = state.friends.map(f => {
    if (f.sortKey === friendId) {
      const newActivities = f.activities.filter(a => a.sortKey !== activityId);
      return { ...f, activities: newActivities };
    }
    return f;
  });

  return { ...state, friends };
}

function handleFetchTodosSucceeded(state, { friendId, todos }) {
  const friends = state.friends.map(f => {
    if (f.sortKey === friendId) {
      return { ...f, todos };
    }
    return f;
  });

  return { ...state, friends };
}

function handleCreateTodoSucceeded(state, { friendId, todo }) {
  const friends = state.friends.map(f => {
    if (f.sortKey === friendId) {
      const newTodos = [todo, ...f.todos];
      return { ...f, todos: newTodos };
    }
    return f;
  });

  return { ...state, friends };
}

function handleUpdateTodoSucceeded(state, { friendId, todoId, todo }) {
  const friends = state.friends.map(f => {
    if (f.sortKey === friendId) {
      const newTodos = orderByPosition(f.todos.map(t => (t.sortKey === todoId ? todo : t)));
      return { ...f, todos: newTodos };
    }
    return f;
  });

  return { ...state, friends };
}

function handleDeleteTodoSucceeded(state, { friendId, todoId }) {
  const friends = state.friends.map(f => {
    if (f.sortKey === friendId) {
      const newTodos = f.todos.filter(t => t.sortKey !== todoId);
      return { ...f, todos: newTodos };
    }
    return f;
  });

  return { ...state, friends };
}

function handleFetchDoneTodosSucceeded(state, { friendId, startKey, todos, hasMore }) {
  const friends = state.friends.map(f => {
    if (f.sortKey === friendId) {
      const newTodos = uniqByKey([...f.doneTodos, ...todos], 'sortKey');
      return {
        ...f,
        doneTodos: newTodos,
        doneTodosStartKey: startKey,
        hasMoreDoneTodos: hasMore,
        hasLoadedDoneTodos: true,
      };
    }
    return f;
  });

  return { ...state, friends };
}

function handleMarkTodoAsDoneSucceeded(state, { friendId, todoId, doneTodo }) {
  const friends = state.friends.map(f => {
    if (f.sortKey === friendId) {
      const newTodos = f.todos.filter(t => t.sortKey !== todoId);
      const newDoneTodos = f.hasLoadedDoneTodos ? [doneTodo, ...f.doneTodos] : [];
      return { ...f, todos: newTodos, doneTodos: newDoneTodos };
    }
    return f;
  });

  return { ...state, friends };
}

function handleMarkTodoAsUndoneSucceeded(state, { friendId, todoId, todo }) {
  const friends = state.friends.map(f => {
    if (f.sortKey === friendId) {
      const newTodos = [todo, ...f.todos];
      const newDoneTodos = f.doneTodos.filter(t => t.sortKey !== todoId);
      return { ...f, todos: newTodos, doneTodos: newDoneTodos };
    }
    return f;
  });

  return { ...state, friends };
}

function handleSetTab(state, { friendId, tab }) {
  const friends = state.friends.map(f => {
    if (f.sortKey === friendId) {
      return { ...f, tab };
    }
    return f;
  });

  return { ...state, friends };
}

export function friendReducer(state = initialState, action) {
  switch (action.type) {
    case friendActionTypes.IS_LOADING:
      return handleIsLoading(state, action.payload);

    case friendActionTypes.FETCH_FRIENDS_SUCCEDDED:
      return handleFetchFriendsSucceeded(state, action.payload);

    case friendActionTypes.CREATE_FRIEND_SUCCEDDED:
      return handleCreateFriendSucceeded(state, action.payload);

    case friendActionTypes.UPDATE_FRIEND_SUCCEDDED:
      return handleUpdateFriendSuccedded(state, action.payload);

    case friendActionTypes.DELETE_FRIEND_SUCCEDDED:
      return handleDeleteFriendSuccedded(state, action.payload);

    case friendActionTypes.FETCH_ACTIVITIES_SUCCEDDED:
      return handleFetchActivitiesSucceeded(state, action.payload);

    case friendActionTypes.CREATE_ACTIVITY_SUCCEDDED:
      return handleCreateActivitySucceeded(state, action.payload);

    case friendActionTypes.UPDATE_ACTIVITY_SUCCEDDED:
      return handleUpdateActivitySucceeded(state, action.payload);

    case friendActionTypes.DELETE_ACTIVITY_SUCCEDDED:
      return handleDeleteActivitySucceeded(state, action.payload);

    case friendActionTypes.FETCH_TODOS_SUCCEDDED:
      return handleFetchTodosSucceeded(state, action.payload);

    case friendActionTypes.CREATE_TODO_SUCCEDDED:
      return handleCreateTodoSucceeded(state, action.payload);

    case friendActionTypes.UPDATE_TODO_SUCCEDDED:
      return handleUpdateTodoSucceeded(state, action.payload);

    case friendActionTypes.DELETE_TODO_SUCCEDDED:
      return handleDeleteTodoSucceeded(state, action.payload);

    case friendActionTypes.FETCH_DONE_TODOS_SUCCEDDED:
      return handleFetchDoneTodosSucceeded(state, action.payload);

    case friendActionTypes.MARK_TODO_AS_DONE_SUCCEDDED:
      return handleMarkTodoAsDoneSucceeded(state, action.payload);

    case friendActionTypes.MARK_TODO_AS_UNDONE_SUCCEDDED:
      return handleMarkTodoAsUndoneSucceeded(state, action.payload);

    case friendActionTypes.SET_TAB:
      return handleSetTab(state, action.payload);

    case sharedActionTypes.RESET:
      return handleReset();

    default:
      return state;
  }
}
