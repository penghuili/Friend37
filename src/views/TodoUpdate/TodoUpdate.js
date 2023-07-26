import { Button, Text } from 'grommet';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DatePicker from '../../shared/react-pure/DatePicker';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import TextEditor from '../../shared/react-pure/TextEditor';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';

function TodoUpdate({ friendId, todoId, todo, isLoading, onUpdate, onFetchFriends, onFetchTodos }) {
  const [title, setTitle] = useState('');
  useListener(todo?.title, value => setTitle(value || ''));
  const [note, setNote] = useState('');
  useListener(todo?.note, value => setNote(value || ''));
  const [date, setDate] = useState(new Date());
  useListener(todo?.date, value => setDate(new Date(value || new Date())));

  useEffectOnce(() => {
    onFetchFriends();
    onFetchTodos(friendId);
  });

  return (
    <>
      <AppBar title="Update todo" hasBack />
      <ContentWrapper>
        <InputField label="Title" placeholder="Title" value={title} onChange={setTitle} />
        <Spacer />
        <Text weight="bold">Note</Text>
        <TextEditor text={note} onChange={setNote} />
        <Spacer />
        <DatePicker label="Date" value={date} onChange={setDate} />
        <Spacer />

        <Button
          label="Update todo"
          onClick={() => {
            onUpdate(friendId, todoId, { title, note, date });
          }}
          disabled={!title || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default TodoUpdate;
