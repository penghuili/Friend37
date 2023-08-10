import { Button, Text } from 'grommet';
import React, { useState } from 'react';

import { formatDateWeekTime } from '../../shared/js/date';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';
import TextEditor from '../../shared/react/TextEditor';

function ActivityUpdate({
  friendId,
  activityId,
  activity,
  isLoading,
  isUpdating,
  onUpdate,
  onFetch,
}) {
  const [note, setNote] = useState('');
  useListener(activity?.note, value => setNote(value || ''));

  useEffectOnce(() => {
    onFetch({ id: friendId, childId: activityId });
  });

  return (
    <>
      <AppBar title="Update activity" hasBack isLoading={isLoading || isUpdating} />
      <ContentWrapper>
        {!!activity && (
          <>
            Updated at: {formatDateWeekTime(new Date(activity.updatedAt || activity.createdAt))}
            <Spacer />
            <Text weight="bold">Note</Text>
            <TextEditor text={note} onChange={setNote} />
            <Spacer />
            <Button
              label="Update activity"
              onClick={() => {
                onUpdate({ id: friendId, childId: activityId, note, goBack: true });
              }}
              disabled={!note || isLoading || isUpdating}
            />
          </>
        )}
      </ContentWrapper>
    </>
  );
}

export default ActivityUpdate;
