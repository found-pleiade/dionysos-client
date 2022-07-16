import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import useCreateUser from '../../hooks/createUser';
import Button from '../Button';
import Input from '../Input';
import RowGroup from '../RowGroup';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const {
    isLoading, error, data, safeMutate,
  } = useCreateUser(name);
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
      <Input id="connect" className="rounded-r-none bg-light-primary-100 focus:bg-light-primary-100" placeholder="Username" value={name} setValue={setName} />

      <Button className="rounded-l-none w-[12ch] flex items-center justify-center" onClick={safeMutate}>
        {buttonText()}
      </Button>
    </RowGroup>
  );
};

export default RegisterForm;
