import { useMutation } from 'react-query';
import useSettings from './settings';

const useRegister = (username: string) => {
  const settings = useSettings();

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
