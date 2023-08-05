import { connect } from 'react-redux';

import { friendActionCreators } from '../../store/friend/friendActions';
import { friendSelectors } from '../../store/friend/friendSelectors';
import FriendsReorder from './FriendsReorder';

const mapStateToProps = state => ({
  isLoading: friendSelectors.isLoading(state),
  friends: friendSelectors.getFriends(state),
});

const mapDispatchToProps = {
  onFetch: friendActionCreators.fetchFriendsRequested,
  onUpdate: friendActionCreators.updateFriendPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsReorder);
