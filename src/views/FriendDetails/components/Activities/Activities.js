import { Box, Button, Menu, Spinner, Text } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import React, { useState } from 'react';

import { formatDateWeekTime } from '../../../../shared/js/date';
import HorizontalCenter from '../../../../shared/react-pure/HorizontalCenter';
import { useEffectOnce } from '../../../../shared/react/hooks/useEffectOnce';
import RouteLink from '../../../../shared/react/RouteLink';
import TextEditor from '../../../../shared/react/TextEditor';

function Activities({
  friendId,
  activities,
  hasMore,
  startKey,
  isDeleting,
  onFetch,
  onDelete,
  onNav,
}) {
  const [deleteId, setDeleteId] = useState(null);

  useEffectOnce(() => {
    onFetch({ id: friendId });
  });

  function renderActivities() {
    if (!activities?.length) {
      return <Text margin="0 0 1rem">No activities</Text>;
    }

    return (
      <>
        {activities.map(activity => (
          <Box key={activity.sortKey}>
            <HorizontalCenter>
              <Text size="xsmall">{formatDateWeekTime(new Date(activity.createdAt))}</Text>
              <Menu
                icon={<MoreVertical />}
                items={[
                  {
                    label: 'Update',
                    onClick: () =>
                      onNav(`/friends/${friendId}/activities/${activity.sortKey}/update`),
                    margin: '0.25rem 0',
                  },
                  {
                    label: 'Delete',
                    onClick: () => {
                      setDeleteId(activity.sortKey);
                      onDelete({ id: friendId, itemId: activity.sortKey });
                    },
                    margin: '0.25rem 0',
                    color: 'status-critical',
                  },
                ]}
              />
              {isDeleting && deleteId === activity.sortKey && <Spinner size="xsmall" />}
            </HorizontalCenter>
            <TextEditor editable={false} text={activity.note} />
          </Box>
        ))}
        {hasMore && <Button label="Load more" onClick={() => onFetch(friendId, startKey)} />}
      </>
    );
  }

  return (
    <>
      <HorizontalCenter>
        <RouteLink label="Add activity" to={`/friends/${friendId}/activities/add`} size="small" />
      </HorizontalCenter>
      <Box>{renderActivities()}</Box>
    </>
  );
}

export default Activities;
