import { subYears } from 'date-fns';
import { Button, Text } from 'grommet';
import React, { useState } from 'react';

import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DatePicker from '../../shared/react-pure/DatePicker';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import TextEditor from '../../shared/react-pure/TextEditor';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { formatDate } from '../../shared/js/date';
import { useListener } from '../../shared/react/hooks/useListener';

function FriendUpdate({ friendId, friend, isLoading, onUpdate, onFetchFriends }) {
  const [name, setName] = useState('');
  useListener(friend?.name, value => setName(value || ''));
  const [email, setEmail] = useState('');
  useListener(friend?.email, value => setEmail(value || ''));
  const [phone, setPhone] = useState('');
  useListener(friend?.phone, value => setPhone(value || ''));
  const [birthday, setBirthday] = useState(subYears(new Date(), 20));
  useListener(friend?.birthday, value => setBirthday(new Date(value || subYears(new Date(), 20))));
  const [summary, setSummary] = useState('');
  useListener(friend?.summary, value => setSummary(value || ''));

  useEffectOnce(() => {
    onFetchFriends();
  });

  return (
    <>
      <AppBar title="Update friend" hasBack />
      <ContentWrapper>
        <InputField label="Name" placeholder="Name" value={name} onChange={setName} />
        <Spacer />
        <InputField label="Email" placeholder="Email" value={email} onChange={setEmail} />
        <Spacer />
        <InputField label="Phone" placeholder="Phone" value={phone} onChange={setPhone} />
        <Spacer />
        <DatePicker label="Birthday" value={birthday} onChange={setBirthday} />
        <Spacer />
        <Text weight="bold">What do you know about your friend?</Text>
        <TextEditor text={summary} onChange={setSummary} />
        <Spacer />

        <Button
          label="Update friend"
          onClick={() => {
            onUpdate(friendId, { name, email, phone, birthday: formatDate(birthday), summary });
          }}
          disabled={!name || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default FriendUpdate;
