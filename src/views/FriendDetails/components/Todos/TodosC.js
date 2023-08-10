import { connect } from 'react-redux';

import { sharedActionCreators } from '../../../../shared/react/store/sharedActions';
import { doneTodoActions, doneTodoSelectors } from '../../../../store/doneTodo/doneTodoStore';
import { todoActions, todoSelectors } from '../../../../store/todo/todoStore';
import Todos from './Todos';

const mapStateToProps = (state, { friendId }) => ({
  friendId,
  todos: todoSelectors.data.getItems(state, friendId),
  doneTodos: doneTodoSelectors.data.getItems(state, friendId),
  hasLoadedDoneTodos: doneTodoSelectors.fetchDoneTodos.isSuccessful(state, friendId),
  hasMoreDoneTodos: doneTodoSelectors.data.hasMore(state, friendId),
  doneTodosStartKey: doneTodoSelectors.data.getStartKey(state, friendId),
  isMarkingDone: todoSelectors.markTodoAsDone.isPending(state, friendId),
  isMarkingUndone: todoSelectors.markTodoAsUndone.isPending(state, friendId),
  isDeleting: todoSelectors.deleteItem.isPending(state, friendId),
  isLoadingDoneTodos: doneTodoSelectors.fetchDoneTodos.isPending(state, friendId),
});

const mapDispatchToProps = {
  onFetchTodos: todoActions.fetchItems.requested.action,
  onFetchDoneTodos: doneTodoActions.fetchItems.requested.action,
  onMarkAsDone: todoActions.markTodoAsDone.requested.action,
  onMarkAsUndone: todoActions.markTodoAsUndone.requested.action,
  onDelete: todoActions.deleteItem.requested.action,
  onNav: sharedActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
