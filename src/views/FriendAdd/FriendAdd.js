import { Button, Text } from 'grommet';
import React, { useState } from 'react';

import { formatDate } from '../../shared/js/date';
import ContentWrapper from '../../shared/react-pure/ContentWrapper';
import DatePicker from '../../shared/react-pure/DatePicker';
import InputField from '../../shared/react-pure/InputField';
import Spacer from '../../shared/react-pure/Spacer';
import AppBar from '../../shared/react/AppBar';
import TextEditor from '../../shared/react/TextEditor';

function FriendAdd({ isCreating, onCreate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [summary, setSummary] = useState('');

  return (
    <>
      <AppBar title="Add friend" hasBack />
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
          label="Add friend"
          onClick={() => {
            onCreate({
              name,
              email,
              phone,
              birthday: birthday ? formatDate(birthday) : null,
              summary,
              goBack: true,
            });
          }}
          disabled={!name || isCreating}
        />
      </ContentWrapper>
    </>
  );
}

export default FriendAdd;
