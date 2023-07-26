import { connect } from 'react-redux';

import { friendActionCreators } from '../../../../store/friend/friendActions';
import { friendSelectors } from '../../../../store/friend/friendSelectors';
import Activities from './Activities';
import { sharedActionCreators } from '../../../../shared/react/store/sharedActions';

const mapStateToProps = (state, { friendId }) => ({
  friendId,
  activities: friendSelectors.getActivities(state, friendId),
  hasMore: friendSelectors.hasMoreActivities(state, friendId),
  startKey: friendSelectors.getActivitiesStartKey(state, friendId),
});

const mapDispatchToProps = {
  onFetch: friendActionCreators.fetchActivitiesRequested,
  onDelete: friendActionCreators.deleteActivityPressed,
  onNav: sharedActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
