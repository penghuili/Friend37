import { isDone, tabs } from './friendHelpers';

export const friendSelectors = {
  isLoading: state => state.friends?.isLoading,
  getFriends: state => state.friends?.friends,
  getFriend: (state, friendId) => state.friends?.friends?.find(f => f.sortKey === friendId),
  getActivities: (state, friendId) =>
    state.friends?.friends?.find(f => f.sortKey === friendId)?.activities,
  getActivity: (state, friendId, activityId) =>
    state.friends?.friends
      ?.find(f => f.sortKey === friendId)
      ?.activities?.find(a => a.sortKey === activityId),
  hasMoreActivities: (state, friendId) =>
    state.friends?.friends?.find(f => f.sortKey === friendId)?.hasMoreActivities,
  getActivitiesStartKey: (state, friendId) =>
    state.friends?.friends?.find(f => f.sortKey === friendId)?.activitiesStartKey,
  getTodos: (state, friendId) => state.friends?.friends?.find(f => f.sortKey === friendId)?.todos,
  getDoneTodos: (state, friendId) =>
    state.friends?.friends?.find(f => f.sortKey === friendId)?.doneTodos,
  getTodo: (state, friendId, todoId) => {
    const friend = state.friends?.friends?.find(f => f.sortKey === friendId);
    const todos = isDone(todoId) ? friend?.doneTodos : friend?.todos;
    return todos?.find(t => t.sortKey === todoId);
  },
  hasLoadedDoneTodos: (state, friendId) =>
    state.friends?.friends?.find(f => f.sortKey === friendId)?.hasLoadedDoneTodos,
  hasMoreDoneTodos: (state, friendId) =>
    state.friends?.friends?.find(f => f.sortKey === friendId)?.hasMoreDoneTodos,
  getDoneTodosStartKey: (state, friendId) =>
    state.friends?.friends?.find(f => f.sortKey === friendId)?.doneTodosStartKey,
  getTab: (state, friendId) =>
    state.friends?.friends?.find(f => f.sortKey === friendId)?.tab || tabs.summary,
};
