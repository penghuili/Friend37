import { Button, Text } from 'grommet';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DatePicker from '../../shared/react-pure/DatePicker';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import TextEditor from '../../shared/react-pure/TextEditor';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';

function TodoAdd({ friendId, isLoading, onCreate, onFetchFriends }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(null);

  useEffectOnce(() => {
    onFetchFriends();
  });

  return (
    <>
      <AppBar title="Add todo" hasBack />
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
            onCreate(friendId, { title, note, date: date ? date.getTime() : null });
          }}
          disabled={!title || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default TodoAdd;
