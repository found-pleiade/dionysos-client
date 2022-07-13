import { useContext } from 'react';
import { useMutation } from 'react-query';
import SettingsContext from '../contexts/SettingContext';

const useRegister = (username: string) => {
  const settings = useContext(SettingsContext);

  const {
    isLoading, error, data, mutate,
  } = useMutation(
    'createUser',
    () => fetch(`${settings.get.server}/users/`, {
      method: 'POST',
      body: JSON.stringify({ username }),
    }).then(
      (res) => res.json(),
    ),
  );

  const createUser = () => {
    if (data) return;
    mutate();
  };

  return {
    isLoading, error, data, createUser,
  };
};

export default useRegister;
