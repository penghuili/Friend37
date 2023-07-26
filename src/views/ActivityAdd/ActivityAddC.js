import { connect } from 'react-redux';

import { friendActionCreators } from '../../store/friend/friendActions';
import { friendSelectors } from '../../store/friend/friendSelectors';
import ActivityAdd from './ActivityAdd';

const mapStateToProps = (state, { params: { friendId } }) => ({
  friendId,
  isLoading: friendSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetchFriends: friendActionCreators.fetchFriendsRequested,
  onCreate: friendActionCreators.createActivityPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityAdd);
