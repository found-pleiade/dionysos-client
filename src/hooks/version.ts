import { useQuery } from 'react-query';

const useVersion = () => {
  const { isLoading, error, data } = useQuery(
    'getVersion',
    () => fetch('https://dionysos-test.yannlacroix.fr/version').then(
      (res) => res.text(),
    ),
  );

  return { isLoading, error, data };
};

export default useVersion;
