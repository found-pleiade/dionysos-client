import React, { useEffect, useRef, useState } from 'react';
import * as R from 'ramda';
import { codes } from '../constants';
import {
  isValid, preventDialogEscape, requestData, testActiveElementById, toggleDialog,
} from '../utils';
import {
  SendFunction, User,
} from '../utils/types';
import Button from './Button';
import Input from './Input';
import useModal from '../hooks/modal';
import useConnection from '../hooks/connection';
import useUsers from '../hooks/users';

const cancelModal = (
  modal: ReturnType<typeof useModal>,
  user: User,
  setNewUserName: React.Dispatch<React.SetStateAction<string>>,
) => () => {
  setNewUserName(user.name);
  modal.toggle();
};

const saveModal = (
  modal: ReturnType<typeof useModal>,
  newUserName: string,
  users: ReturnType<typeof useUsers>,
  changeUsername: (send: SendFunction, username: string) => void,
  connection: ReturnType<typeof useConnection>,
) => {
  if (R.not(isValid(newUserName))) return;
  changeUsername(connection.send, newUserName);
  users.setCurrent({ ...users.current, name: newUserName });
  modal.toggle();
};

const changeUsername = (
  send: SendFunction,
  username: string,
) => {
  send(requestData(
    codes.request.changeUserName,
    { newUserName: username },
  ));
};

const handleKeyPressInput = (id: string, func: any) => (event: any) => {
  if (event.code === 'Enter' && testActiveElementById(id)) {
    func();
  }
};

type ConnectModalProps = {
  modal: ReturnType<typeof useModal>,
  users: ReturnType<typeof useUsers>,
  connection: ReturnType<typeof useConnection>,
}

const ChangeNameModal = ({
  modal,
  users,
  connection,
}: ConnectModalProps) => {
  const [newUserName, setNewUserName] = useState(users.current.name);
  const saveModalHandler = () => saveModal(modal, newUserName, users, changeUsername, connection);

  const dialogRef = useRef() as any;
  useEffect(() => {
    preventDialogEscape(dialogRef);
    toggleDialog(modal.isOpen, dialogRef);
  }, [modal]);

  return (
    <dialog ref={dialogRef} className="pt-9 min-w-[55ch] p-6 first-letter:space-y-6 bg-background-700 rounded-md relative space-y-6 text-foreground">
      <Input id="nameChange" placeholder="Username" value={newUserName} setValue={setNewUserName} onKeyPress={handleKeyPressInput('nameChange', saveModalHandler)} />

      <div className="flex justify-between">
        <Button colorless onClick={cancelModal(modal, users.current, setNewUserName)}>
          Cancel
        </Button>

        <Button onClick={saveModalHandler} disabled={!isValid(newUserName)}>
          Save
        </Button>
      </div>
    </dialog>
  );
};

export default ChangeNameModal;
