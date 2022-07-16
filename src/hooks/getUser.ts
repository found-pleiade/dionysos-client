import { useContext } from 'react';
import { useQuery } from 'react-query';
import SettingsContext from '../contexts/SettingContext';
import UserContext from '../contexts/UserContext';

const useGetUser = () => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);

  const {
    isLoading, error, data,
  } = useQuery(
    'createUser',
    () => fetch(`${settings.get.server}${user.get.uri}`).then(
      (res) => res.json(),
    ),
  );

  return {
    isLoading, error, data,
  };
};

export default useGetUser;
