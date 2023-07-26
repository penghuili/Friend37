import { Box, Text } from 'grommet';
import React from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import RouteLink from '../../shared/react/RouteLink';

function Friends({ friends, isLoading, onFetch }) {
  useEffectOnce(() => {
    onFetch();
  });

  return (
    <>
      <AppBar title="Friend37" isLoading={isLoading} />
      <ContentWrapper>
        <HorizontalCenter margin="0 0 1rem">
          <RouteLink to="/friends/add" label="Add friend" color="status-ok" margin="0 1rem 0 0" />
        </HorizontalCenter>
        <Divider />
        <Spacer />

        {!!friends?.length && (
          <Box direction="row" wrap>
            {friends.map(topic => (
              <Box key={topic.sortKey} margin="0 1rem 1rem 0">
                <RouteLink to={`/friends/${topic.sortKey}`} label={topic.name} />
              </Box>
            ))}
          </Box>
        )}

        {!friends?.length && !isLoading && (
          <>
            <Text margin="0 0 1rem">No friends yet.</Text>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default Friends;
