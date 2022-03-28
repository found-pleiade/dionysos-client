import { useState } from 'react';

const useErrors = () => {
  const [errors, setErrors] = useState<Array<string>>([]);

  const newError = (message: string) => {
    setErrors(errors.concat(message));
  };

  return {
    get: errors,
    add: newError,
  };
};

export default useErrors;
