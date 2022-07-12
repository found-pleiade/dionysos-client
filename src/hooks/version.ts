import { useQuery } from 'react-query';
import useSettings from './settings';

const useVersion = (address?: string, enabled = true) => {
  const settings = useSettings();

  const {
    isStale, isLoading, isFetching, error, data, refetch,
  } = useQuery(
    'getVersion',
    () => fetch(`${address || settings.get.server}/version`).then(
      (res) => res.text(),
    ),
    {
      enabled,
      staleTime: 800,
    },
  );

  return {
    isStale, isLoading: (isLoading || isFetching), error, data, refetch,
  };
};

export default useVersion;
