import { connect } from 'react-redux';

import { activityActions, activitySelectors } from '../../store/activity/activityStore';
import ActivityAdd from './ActivityAdd';

const mapStateToProps = (state, { params: { friendId } }) => ({
  friendId,
  isCreating: activitySelectors.createItem.isPending(state, friendId),
});

const mapDispatchToProps = {
  onCreate: activityActions.createRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityAdd);
