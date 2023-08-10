import { Button, Text } from 'grommet';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DatePicker from '../../shared/react-pure/DatePicker';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import TextEditor from '../../shared/react/TextEditor';

function TodoAdd({ friendId, isCreating, onCreate }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(null);

  return (
    <>
      <AppBar title="Add todo" hasBack isLoading={isCreating} />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />
        <Spacer />
        <Text weight="bold">Note</Text>
        <TextEditor text={note} onChange={setNote} />
        <Spacer />
        <DatePicker label="Date" value={date} onChange={setDate} />
        <Spacer />

        <Button
          label="Add todo"
          onClick={() => {
            onCreate({
              id: friendId,
              title,
              note,
              date: date ? date.getTime() : null,
              goBack: true,
            });
          }}
          disabled={!title || isCreating}
        />
      </ContentWrapper>
    </>
  );
}

export default TodoAdd;
