import { connect } from 'react-redux';

import { friendActionCreators } from '../../store/friend/friendActions';
import { friendSelectors } from '../../store/friend/friendSelectors';
import Friends from './Friends';

const mapStateToProps = state => ({
  friends: friendSelectors.getFriends(state),
  isLoading: friendSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetch: friendActionCreators.fetchFriendsRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
