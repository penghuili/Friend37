import { connect } from 'react-redux';

import { friendActionCreators } from '../../store/friend/friendActions';
import { friendSelectors } from '../../store/friend/friendSelectors';
import ActivityUpdate from './ActivityUpdate';

const mapStateToProps = (state, { params: { friendId, activityId } }) => ({
  friendId,
  activityId,
  activity: friendSelectors.getActivity(state, friendId, activityId),
  isLoading: friendSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchFriends: friendActionCreators.fetchFriendsRequested,
  onFetchActivities: friendActionCreators.fetchActivitiesRequested,
  onUpdate: friendActionCreators.updateActivityPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityUpdate);
