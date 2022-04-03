import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../utils/types';

const useUsers = () => {
  const defaultUser = {
    id: '',
    uuid: uuidv4(),
    name: '',
  };

  const [current, setCurrent] = useState<User>(defaultUser);
  const [get, set] = useState<Array<User>>([]);

  return {
    current,
    setCurrent,
    get,
    set,
  };
};

export default useUsers;
