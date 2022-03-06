import { useState } from 'react';

const useConnection = (): { isConnected: boolean, toggle: () => void } => {
  const [isConnected, setIsConnected] = useState(false);

  function toggle() {
    setIsConnected(!isConnected);
  }

  return {
    isConnected,
    toggle,
  };
};

export default useConnection;
