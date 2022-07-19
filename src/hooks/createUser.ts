import { useContext } from 'react';
import { useMutation } from 'react-query';
import SettingsContext from '../contexts/SettingContext';

const useCreateUser = (name: string) => {
  const settings = useContext(SettingsContext);

  const {
    isLoading, error, data, mutate,
  } = useMutation(
    'createUser',
    () => fetch(`${settings.get.server}/users`, {
      method: 'POST',
      body: JSON.stringify({ name }),
    }).then(
      (res) => res.json(),
    ),
  );

  const safeMutate = () => {
    if (data || isLoading) return;
    mutate();
  };

  return {
    isLoading, error, data, safeMutate,
  };
};

export default useCreateUser;
