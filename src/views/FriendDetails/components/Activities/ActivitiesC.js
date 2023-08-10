import { connect } from 'react-redux';

import { sharedActionCreators } from '../../../../shared/react/store/sharedActions';
import { activityActions, activitySelectors } from '../../../../store/activity/activityStore';
import Activities from './Activities';

const mapStateToProps = (state, { friendId }) => ({
  friendId,
  activities: activitySelectors.data.getItems(state, friendId),
  hasMore: activitySelectors.data.hasMore(state, friendId),
  startKey: activitySelectors.data.getStartKey(state, friendId),
  isDeleting: activitySelectors.deleteItem.isPending(state, friendId),
});

const mapDispatchToProps = {
  onFetch: activityActions.fetchItemsRequested,
  onDelete: activityActions.deleteRequested,
  onNav: sharedActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
