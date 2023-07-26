import { connect } from 'react-redux';

import { friendActionCreators } from '../../store/friend/friendActions';
import { friendSelectors } from '../../store/friend/friendSelectors';
import TodoUpdate from './TodoUpdate';

const mapStateToProps = (state, { params: { friendId, todoId } }) => ({
  friendId,
  todoId,
  todo: friendSelectors.getTodo(state, friendId, todoId),
  isLoading: friendSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchFriends: friendActionCreators.fetchFriendsRequested,
  onFetchTodos: friendActionCreators.fetchTodosRequested,
  onUpdate: friendActionCreators.updateTodoPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoUpdate);
