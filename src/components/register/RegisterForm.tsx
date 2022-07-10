import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import useRegister from '../../hooks/register';
import Button from '../Button';
import Input from '../Input';
import RowGroup from '../RowGroup';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const {
    isLoading, error, data, createUser,
  } = useRegister(username);

  const buttonText = () => {
    if (isLoading) {
      return <ClipLoader size="18px" color="white" />;
    }

    if (error) {
      return 'Try again';
    }

    if (data) {
      return 'Connected';
    }

    return 'Next';
  };

  return (
    <RowGroup>
      <Input id="connect" className="rounded-r-none bg-light-primary-100 focus:bg-light-primary-100" placeholder="Username" value={username} setValue={setUsername} />

      <Button className="rounded-l-none w-[12ch] flex items-center justify-center" onClick={createUser}>
        {buttonText()}
      </Button>
    </RowGroup>
  );
};

export default RegisterForm;
