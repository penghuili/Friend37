import { Button, Text } from 'grommet';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DatePicker from '../../shared/react-pure/DatePicker';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';
import TextEditor from '../../shared/react/TextEditor';

function TodoUpdate({ friendId, todoId, todo, isLoading, isUpdating, onUpdate, onFetch }) {
  const [title, setTitle] = useState('');
  useListener(todo?.title, value => setTitle(value || ''));
  const [note, setNote] = useState('');
  useListener(todo?.note, value => setNote(value || ''));
  const [date, setDate] = useState(null);
  useListener(todo?.date, value => setDate(value ? new Date(value) : null));

  useEffectOnce(() => {
    onFetch({ id: friendId, childId: todoId });
  });

  return (
    <>
      <AppBar title="Update todo" hasBack isLoading={isLoading || isUpdating} />
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
            onUpdate({
              id: friendId,
              childId: todoId,
              title,
              note,
              date: date ? date.getTime() : null,
              goBack: true,
            });
          }}
          disabled={!title || isUpdating}
        />
      </ContentWrapper>
    </>
  );
}

export default TodoUpdate;
