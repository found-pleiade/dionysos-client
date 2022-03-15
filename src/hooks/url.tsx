import { useState } from 'react';

const useUrl = (devServer: string) => {
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
