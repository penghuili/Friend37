import { Button, Heading, Menu, NameValueList, NameValuePair, Tab, Tabs, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React from 'react';

import { formatDate } from '../../shared/js/date';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Divider from '../../shared/react-pure/Divider';
import HorizontalCenter from '../../shared/react-pure/HorizontalCenter';
import Spacer from '../../shared/react-pure/Spacer';
import TextEditor from '../../shared/react-pure/TextEditor';
import AppBar from '../../shared/react/AppBar';
import RouteLink from '../../shared/react/RouteLink';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import Activities from './components/Activities';
import Todos from './components/Todos';

function FriendDetails({ friendId, friend, tab, isLoading, onFetchFriends, onChangeTab, onNav }) {
  useEffectOnce(() => {
    onFetchFriends();
  });

  return (
    <>
      <AppBar title="Friend details" isLoading={isLoading} hasBack />
      <ContentWrapper>
        {!!friend && (
          <>
            <HorizontalCenter margin="1rem 0">
              <Heading margin="0">{friend.name}</Heading>
              <Menu
                icon={<MoreVertical />}
                items={[
                  {
                    label: 'Update',
                    onClick: () => onNav(`/friends/${friend.sortKey}/update`),
                    margin: '0.25rem 0',
                  },
                  {
                    label: 'Delete',
                    onClick: () => {},
                    margin: '0.25rem 0',
                    color: 'status-critical',
                  },
                ]}
              />
            </HorizontalCenter>

            <NameValueList>
              <NameValuePair name="Email">
                <Text color="text-strong">{friend.email || 'Empty'}</Text>
              </NameValuePair>
              <NameValuePair name="Phone">
                <Text color="text-strong">{friend.phone || 'Empty'}</Text>
              </NameValuePair>
              <NameValuePair name="Birthday">
                <Text color="text-strong">{formatDate(new Date(friend.birthday))}</Text>
              </NameValuePair>
            </NameValueList>

            <Spacer />
            <Divider />
            <Spacer />

            <Tabs
              activeIndex={tab}
              onActive={newTab => onChangeTab(friendId, newTab)}
              justify="start"
            >
              <Tab title="Summary">
                <Spacer />
                <HorizontalCenter>
                  <RouteLink to={`/friends/${friendId}/update`} label="Update" size="small" />
                </HorizontalCenter>

                {friend.summary ? (
                  <TextEditor editable={false} text={friend.summary} />
                ) : (
                  <Button
                    label="Add summary"
                    onClick={() => onNav(`/friends/${friend.sortKey}/update`)}
                    size="xsmall"
                  />
                )}
              </Tab>
              <Tab title="Todos">
                <Spacer />
                <Todos friendId={friendId} />
              </Tab>
              <Tab title="Activities">
                <Spacer />
                <Activities friendId={friendId} />
              </Tab>
            </Tabs>
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default FriendDetails;
