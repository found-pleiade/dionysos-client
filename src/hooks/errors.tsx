import { useState } from 'react';
import { ErrorType } from '../utils/types';

const useErrors = () => {
  const [errors, setErrors] = useState<Array<ErrorType>>([]);

  /**
   * Add a string as an error, optionnal duration.
   */
  const newError = (message: string | undefined, duration?: number) => {
    setErrors(errors.concat({ message, duration }));
  };

  /**
   * Clear all errors. Optionnal error and duration if one is needed after the clean up.
   * Calling clean then add cause async problems, so you can add an error with the clean function.
   */
  const clearErrors = (message?: string, duration?: number) => {
    setErrors([{ message, duration }]);
  };

  return {
    get: errors,
    add: newError,
    clear: clearErrors,
  };
};

export default useErrors;
