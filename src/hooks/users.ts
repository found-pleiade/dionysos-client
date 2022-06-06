import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as R from 'ramda';
import { codes } from '../constants';
import { invalidInput, isValid, requestData } from '../utils';
import { User } from '../utils/types';
import useConnection from './connection';
import useModal from './modal';

const useUsers = (
  connection: ReturnType<typeof useConnection>,
  pageRef: any,
) => {
  const defaultUser = {
    id: '',
    uuid: uuidv4(),
    name: '',
  };

  const [current, setCurrent] = useState<User>(defaultUser);
  const [newUsername, setNewUsername] = useState(current.name);
  const [get, set] = useState<Array<User>>([]);
  const modal = useModal(pageRef);

  const revertNewUsername = () => {
    setNewUsername(current.name);
  };

  const cancelModal = () => {
    revertNewUsername();
    modal.toggle();
  };

  const changeUsername = () => {
    connection.send(requestData(
      codes.request.changeUserName,
      { newUserName: newUsername },
    ));
    setCurrent({ ...current, name: newUsername });
  };

  const saveModal = (event: any) => {
    if (R.not(isValid(newUsername))) return;
    if (invalidInput(event)) return;
    changeUsername();
    modal.toggle();
  };

  useEffect(() => {
    setNewUsername(current.name);
  }, [current]);

  return {
    current: {
      modal: {
        ...modal,
        save: saveModal,
        cancel: cancelModal,
      },
      get: current,
      set: setCurrent,
      newUsername,
      setNewUsername,
    },
    get,
    set,
  };
};

export default useUsers;
