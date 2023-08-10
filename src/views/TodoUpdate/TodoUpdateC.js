import { connect } from 'react-redux';

import { todoActions, todoSelectors } from '../../store/todo/todoStore';
import TodoUpdate from './TodoUpdate';

const mapStateToProps = (state, { params: { friendId, todoId } }) => {
  return {
    friendId,
    todoId,
    todo:
      todoSelectors.data.getStandaloneItem(state, friendId) ||
      todoSelectors.data.getItem(state, friendId, todoId),
    isLoadingTodos: todoSelectors.fetchItems.isPending(state, friendId),
  };
};

const mapDispatchToProps = {
  onFetch: todoActions.fetchItem.requested.action,
  onUpdate: todoActions.updateItem.requested.action,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoUpdate);
