import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import FriendDetails from './FriendDetails';
import { friendActions, friendSelectors } from '../../store/friend/friendStore';

const mapStateToProps = (state, { params: { friendId } }) => ({
  friendId,
  friend: friendSelectors.data.getItem(state, undefined, friendId),
  tab: friendSelectors.data.getTab(state, friendId),
  isLoading: friendSelectors.fetchItems.isPending(state),
});

const mapDispatchToProps = {
  onFetch: friendActions.fetchItemsRequested,
  onChangeTab: friendActions.setTab,
  onDelete: friendActions.deleteRequested,
  onNav: sharedActionCreators.navigate,
  onToast: sharedActionCreators.setToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendDetails);
