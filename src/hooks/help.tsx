import { useState } from 'react';

const useHelp = (defaultState: boolean) => {
  const [isOpen, setIsOpen] = useState(defaultState);

  return {
    isOpen,
    setIsOpen,
  };
};

export default useHelp;
