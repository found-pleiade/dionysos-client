import { useState } from 'react';
import { Room } from '../utils/types';

const useRoom = () => {
  const defaultRoom = {
    id: '',
    name: '',
    isPrivate: false,
    ownerId: '',
  };

  const [current, setCurrent] = useState<Room>(defaultRoom);
  const [pending, setPending] = useState<Room>(defaultRoom);
  const reset = (func: any) => () => {
    func(defaultRoom);
  };

  return {
    current,
    setCurrent,
    resetCurrent: reset(setCurrent),
    pending,
    setPending,
    resetPending: reset(setPending),
  };
};

export default useRoom;
