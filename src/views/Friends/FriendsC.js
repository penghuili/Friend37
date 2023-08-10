import { connect } from 'react-redux';

import Friends from './Friends';
import { friendActions, friendSelectors } from '../../store/friend/friendStore';

const mapStateToProps = state => {
  return {
    friends: friendSelectors.data.getItems(state),
    isLoading: friendSelectors.fetchItems.isPending(state),
  };
};

const mapDispatchToProps = {
  onFetch: friendActions.fetchItemsRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
