import { useContext } from 'react';
import { useMutation } from 'react-query';
import SettingsContext from '../contexts/SettingContext';
import UserContext from '../contexts/UserContext';

const useCreateUser = (name: string) => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);

  const {
    isLoading, error, data, mutate,
  } = useMutation(
    'createUser',
    () => fetch(`${settings.get.server}/users/`, {
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

  if (data) {
    user.dispatch({
      type: 'SET_URI',
      payload: {
        uri: data.uri,
      },
    });
  }

  return {
    isLoading, error, data, safeMutate,
  };
};

export default useCreateUser;
