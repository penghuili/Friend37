import { connect } from 'react-redux';

import { friendActionCreators } from '../../../../store/friend/friendActions';
import { friendSelectors } from '../../../../store/friend/friendSelectors';
import Todos from './Todos';
import { sharedActionCreators } from '../../../../shared/react/store/sharedActions';

const mapStateToProps = (state, { friendId }) => ({
  friendId,
  todos: friendSelectors.getTodos(state, friendId),
  doneTodos: friendSelectors.getDoneTodos(state, friendId),
  hasLoadedDoneTodos: friendSelectors.hasLoadedDoneTodos(state, friendId),
  hasMoreDoneTodos: friendSelectors.hasMoreDoneTodos(state, friendId),
  doneTodosStartKey: friendSelectors.getDoneTodosStartKey(state, friendId),
});

const mapDispatchToProps = {
  onFetchTodos: friendActionCreators.fetchTodosRequested,
  onFetchDoneTodos: friendActionCreators.fetchDoneTodosRequested,
  onMarkAsDone: friendActionCreators.markTodoAsDonePressed,
  onMarkAsUndone: friendActionCreators.markTodoAsUndonePressed,
  onDelete: friendActionCreators.deleteTodoPressed,
  onNav: sharedActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
