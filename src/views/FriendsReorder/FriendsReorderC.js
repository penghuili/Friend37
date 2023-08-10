import { connect } from 'react-redux';

import FriendsReorder from './FriendsReorder';
import { friendActions, friendSelectors } from '../../store/friend/friendStore';

const mapStateToProps = state => ({
  friends: friendSelectors.data.getItems(state),
  isLoading: friendSelectors.fetchItems.isPending(state),
});

const mapDispatchToProps = {
  onFetch: friendActions.fetchItemsRequested,
  onUpdate: friendActions.updateRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsReorder);
