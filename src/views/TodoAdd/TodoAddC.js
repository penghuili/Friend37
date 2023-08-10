import { connect } from 'react-redux';

import { todoActions, todoSelectors } from '../../store/todo/todoStore';
import TodoAdd from './TodoAdd';

const mapStateToProps = (state, { params: { friendId } }) => ({
  friendId,
  isCreating: todoSelectors.createItem.isPending(state, friendId),
});

const mapDispatchToProps = {
  onCreate: todoActions.createItem.requested.action,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoAdd);
