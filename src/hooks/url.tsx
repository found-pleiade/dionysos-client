import { useState } from 'react';
import { devServer } from '../constants';

const useUrl = () => {
  const [current, setCurrent] = useState(devServer);
  const [backup, setBackup] = useState(devServer);

  return {
    current,
    setCurrent,
    backup,
    setBackup,
  };
};

export default useUrl;
