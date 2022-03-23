import React, { useState } from 'react';
import * as R from 'ramda';
import { codes } from '../constants';
import {
  isValid, requestData, testActiveElementById, visibility,
} from '../utils';
import {
  ModalType, SendFunction, SetUser, User,
} from '../utils/types';
import Button from './Button';
import Input from './Input';

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

const cancelModal = (
  modal: ModalType,
  user: User,
  setNewUserName: React.Dispatch<React.SetStateAction<string>>,
) => {
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

const clickBackground = (
  event: ClickEvent,
  modal: ModalType,
  user: User,
  setNewUserName: React.Dispatch<React.SetStateAction<string>>,
) => {
  const el = event.target as HTMLDivElement;
  if (el.classList.contains('modalBackground')) cancelModal(modal, user, setNewUserName);
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

  return (
    <div role="none" className={`${visibility(modal.isShowing)} modalBackground absolute left-0 top-0 h-screen w-screen bg-background-900/60 z-40 flex justify-center items-center`} onClick={(event: ClickEvent) => clickBackground(event, modal, user, setNewUserName)}>
      <div className="w-[450px] p-6 first-letter:space-y-6 bg-background-700 rounded-md relative space-y-6">
        <Input id="nameChange" placeholder="Change your username" value={newUserName} setValue={setNewUserName} onKeyPress={handleKeyPressInput('nameChange', saveModalHandler)} />

        <div className="flex justify-between">
          <Button text="Cancel" colorless onClick={() => cancelModal(modal, user, setNewUserName)} />
          <Button text="Save" onClick={saveModalHandler} disabled={!isValid(newUserName)} />
        </div>
      </div>
    </div>
  );
};

export default ChangeNameModal;
