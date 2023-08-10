import { Button, Text } from 'grommet';
import React, { useState } from 'react';

import { formatDate } from '../../shared/js/date';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DatePicker from '../../shared/react-pure/DatePicker';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import { useEffectOnce } from '../../shared/react/hooks/useEffectOnce';
import { useListener } from '../../shared/react/hooks/useListener';
import TextEditor from '../../shared/react/TextEditor';

function FriendUpdate({ friendId, friend, isLoading, onUpdate, onFetch }) {
  const [name, setName] = useState('');
  useListener(friend?.name, value => setName(value || ''));
  const [email, setEmail] = useState('');
  useListener(friend?.email, value => setEmail(value || ''));
  const [phone, setPhone] = useState('');
  useListener(friend?.phone, value => setPhone(value || ''));
  const [birthday, setBirthday] = useState(null);
  useListener(friend?.birthday, value => setBirthday(value ? new Date(value) : null));
  const [summary, setSummary] = useState('');
  useListener(friend?.summary, value => setSummary(value || ''));

  useEffectOnce(() => {
    onFetch({ childId: friendId });
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
            console.log('friendId', friendId)
            onUpdate({
              childId: friendId,
              name,
              email,
              phone,
              birthday: birthday ? formatDate(birthday) : null,
              summary,
              goBack: true,
            });
          }}
          disabled={!name || isLoading}
        />
      </ContentWrapper>
    </>
  );
}

export default FriendUpdate;
