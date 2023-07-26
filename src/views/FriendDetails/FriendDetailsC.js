import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import FriendDetails from './FriendDetails';
import { friendSelectors } from '../../store/friend/friendSelectors';
import { friendActionCreators } from '../../store/friend/friendActions';

const mapStateToProps = (state, { params: { friendId } }) => ({
  friendId,
  friend: friendSelectors.getFriend(state, friendId),
  tab: friendSelectors.getTab(state, friendId),
  isLoading: friendSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchFriends: friendActionCreators.fetchFriendsRequested,
  onFetchActivities: friendActionCreators.fetchActivitiesRequested,
  onFetchTodos: friendActionCreators.fetchTodosRequested,
  onFetchDoneTodos: friendActionCreators.fetchDoneTodosRequested,
  onChangeTab: friendActionCreators.setTab,
  onNav: sharedActionCreators.navigate,
  onToast: sharedActionCreators.setToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendDetails);
