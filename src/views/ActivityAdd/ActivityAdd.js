import { Button, Text } from 'grommet';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DatePicker from '../../shared/react-pure/DatePicker';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import TextEditor from '../../shared/react/TextEditor';

function ActivityAdd({ friendId, isLoading, onCreate, onFetchFriends }) {
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());

  useEffectOnce(() => {
    onFetchFriends();
  });

  return (
    <>
      <AppBar title="Add activity" hasBack />
      <ContentWrapper>
        <DatePicker showTime label="Date" value={date} onChange={setDate} />
        <Spacer />
        <Text weight="bold">Note</Text>
        <TextEditor text={note} onChange={setNote} />
        <Spacer />

        <Button
          label="Add activity"
          onClick={() => {
            onCreate(friendId, { note, date: date.getTime() });
          }}
          disabled={!note || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default ActivityAdd;
