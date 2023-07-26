import { connect } from 'react-redux';

import { friendActionCreators } from '../../store/friend/friendActions';
import { friendSelectors } from '../../store/friend/friendSelectors';
import TodoAdd from './TodoAdd';

const mapStateToProps = (state, { params: { friendId } }) => ({
  friendId,
  isLoading: friendSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchFriends: friendActionCreators.fetchFriendsRequested,
  onCreate: friendActionCreators.createTodoPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoAdd);
