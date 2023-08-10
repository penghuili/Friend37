import { connect } from 'react-redux';

import { activityActions, activitySelectors } from '../../store/activity/activityStore';
import ActivityUpdate from './ActivityUpdate';

const mapStateToProps = (state, { params: { friendId, activityId } }) => ({
  friendId,
  activityId,
  activity: activitySelectors.data.getStandaloneItem(state, friendId),
  isLoading: activitySelectors.fetchItem.isPending(state, friendId),
  isUpdating: activitySelectors.updateItem.isPending(state, friendId),
});

const mapDispatchToProps = {
  onFetch: activityActions.fetchItemRequested,
  onUpdate: activityActions.updateRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityUpdate);
