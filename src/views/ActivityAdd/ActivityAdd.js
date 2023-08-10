import { Button, Text } from 'grommet';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DatePicker from '../../shared/react-pure/DatePicker';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import TextEditor from '../../shared/react/TextEditor';

function ActivityAdd({ friendId, isCreating, onCreate }) {
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());

  return (
    <>
      <AppBar title="Add activity" hasBack isLoading={isCreating} />
      <ContentWrapper>
        <DatePicker showTime label="Date" value={date} onChange={setDate} />
        <Spacer />
        <Text weight="bold">Note</Text>
        <TextEditor text={note} onChange={setNote} />
        <Spacer />

        <Button
          label="Add activity"
          onClick={() => {
            onCreate({ id: friendId, note, date: date.getTime(), goBack: true });
          }}
          disabled={!note || isCreating}
        />
      </ContentWrapper>
    </>
  );
}

export default ActivityAdd;
