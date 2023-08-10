import { connect } from 'react-redux';

import { friendActions, friendSelectors } from '../../store/friend/friendStore';
import FriendUpdate from './FriendUpdate';

const mapStateToProps = (state, { params: { friendId } }) => ({
  friendId,
  friend:
    friendSelectors.data.getStandaloneItem(state) ||
    friendSelectors.data.getItem(state, undefined, friendId),
  isLoading: friendSelectors.fetchItems.isPending(state),
});

const mapDispatchToProps = {
  onFetch: friendActions.fetchItemRequested,
  onUpdate: friendActions.updateRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendUpdate);
