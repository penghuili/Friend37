import { connect } from 'react-redux';

import { friendActionCreators } from '../../store/friend/friendActions';
import { friendSelectors } from '../../store/friend/friendSelectors';
import FriendUpdate from './FriendUpdate';

const mapStateToProps = (state, { params: { friendId } }) => ({
  isLoading: friendSelectors.isLoading(state),
  friendId,
  friend: friendSelectors.getFriend(state, friendId),
});

const mapDispatchToProps = {
  onFetchFriends: friendActionCreators.fetchFriendsRequested,
  onUpdate: friendActionCreators.updateFriendPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendUpdate);
