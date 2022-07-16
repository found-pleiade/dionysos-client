import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import useRegister from '../../hooks/register';
import Button from '../Button';
import Input from '../Input';
import RowGroup from '../RowGroup';

const RegisterForm = () => {
  const [name, setUser] = useState('');
  const {
    isLoading, error, data, createUser,
  } = useRegister(name);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) navigate('/home');
  }, [data]);

  const buttonText = () => {
    if (isLoading) {
      return <ClipLoader size="18px" color="white" />;
    }

    if (error) {
      return 'Try again';
    }

    return 'Next';
  };

  return (
    <RowGroup>
      <Input id="connect" className="rounded-r-none bg-light-primary-100 focus:bg-light-primary-100" placeholder="Username" value={name} setValue={setUser} />

      <Button className="rounded-l-none w-[12ch] flex items-center justify-center" onClick={createUser}>
        {buttonText()}
      </Button>
    </RowGroup>
  );
};

export default RegisterForm;
