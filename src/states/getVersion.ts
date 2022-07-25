import { useContext } from 'react';
import { useQuery } from 'react-query';
import { SettingsContext } from './settings';

const useVersion = (enabled = true) => {
  const settings = useContext(SettingsContext);

  const { isStale, isLoading, isFetching, error, data, refetch } = useQuery(
    "getVersion",
    () => fetch(`${settings.get.server}/version`).then((res) => res.text()),
    {
      enabled,
      staleTime: 800,
    }
  );

  return {
    isStale,
    isLoading: isLoading || isFetching,
    error,
    data,
    refetch,
  };
};

export default useVersion;
