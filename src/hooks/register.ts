import { useMutation } from 'react-query';

const useRegister = (username: string) => {
  const {
    isLoading, error, data, mutate,
  } = useMutation(
    'createUser',
    () => fetch('https://dionysos-test.yannlacroix.fr/users/', {
      method: 'POST',
      body: JSON.stringify({ username }),
    }).then(
      (res) => res.json(),
    ),
    {
    },
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
