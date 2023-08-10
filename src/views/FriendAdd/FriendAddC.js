import { connect } from 'react-redux';

import FriendAdd from './FriendAdd';
import { friendActions, friendSelectors } from '../../store/friend/friendStore';

const mapStateToProps = state => ({
  isCreating: friendSelectors.createItem.isPending(state),
});

const mapDispatchToProps = {
  onCreate: friendActions.createRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendAdd);
