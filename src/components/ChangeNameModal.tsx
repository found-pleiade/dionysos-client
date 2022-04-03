import React, { useEffect, useRef, useState } from 'react';
import * as R from 'ramda';
import { codes } from '../constants';
import {
  isValid, preventDialogEscape, requestData, testActiveElementById, toggleDialog,
} from '../utils';
import {
  SendFunction, SetUser, User,
} from '../utils/types';
import Button from './Button';
import Input from './Input';
import { ModalType } from '../hooks/modal';

const cancelModal = (
  modal: ModalType,
  user: User,
  setNewUserName: React.Dispatch<React.SetStateAction<string>>,
) => () => {
  setNewUserName(user.name);
  modal.toggle();
};

const saveModal = (
  modal: ModalType,
  newUserName: string,
  user: User,
  setUser: SetUser,
  changeUsername: (send: SendFunction, username: string) => void,
  send: SendFunction,
) => {
  if (R.not(isValid(newUserName))) return;
  changeUsername(send, newUserName);
  setUser({ ...user, name: newUserName });
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
  modal: ModalType,
  user: User,
  setUser: SetUser,
  send: SendFunction
}

const ChangeNameModal = ({
  modal,
  user,
  setUser,
  send,
}: ConnectModalProps) => {
  const [newUserName, setNewUserName] = useState(user.name);
  const saveModalHandler = () => saveModal(modal, newUserName, user, setUser, changeUsername, send);

  const dialogRef = useRef() as any;
  useEffect(() => {
    preventDialogEscape(dialogRef);
    toggleDialog(modal.isOpen, dialogRef);
  }, [modal]);

  return (
    <dialog ref={dialogRef} className="pt-9 min-w-[55ch] p-6 first-letter:space-y-6 bg-background-700 rounded-md relative space-y-6 text-foreground">
      <Input id="nameChange" placeholder="Username" value={newUserName} setValue={setNewUserName} onKeyPress={handleKeyPressInput('nameChange', saveModalHandler)} />

      <div className="flex justify-between">
        <Button text="Cancel" colorless onClick={cancelModal(modal, user, setNewUserName)} />
        <Button text="Save" onClick={saveModalHandler} disabled={!isValid(newUserName)} />
      </div>
    </dialog>
  );
};

export default ChangeNameModal;
