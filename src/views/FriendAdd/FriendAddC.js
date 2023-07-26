import { connect } from 'react-redux';

import { friendActionCreators } from '../../store/friend/friendActions';
import { friendSelectors } from '../../store/friend/friendSelectors';
import FriendAdd from './FriendAdd';

const mapStateToProps = state => ({
  isLoading: friendSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchFriends: friendActionCreators.fetchFriendsRequested,
  onCreate: friendActionCreators.createFriendPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendAdd);
