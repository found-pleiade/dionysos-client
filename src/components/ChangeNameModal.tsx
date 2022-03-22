import React, { useState } from 'react';
import { codes } from '../constants';
import { requestData, visibility } from '../utils';
import {
  ModalType, SendFunction, SetUser, User,
} from '../utils/types';
import Button from './Button';
import Input from './Input';

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

const changeUsername = (
  send: SendFunction,
  user: User,
  newUserName: string,
) => {
  send(requestData(
    codes.request.changeUserName,
    { newUserName, salt: user.salt },
  ));
};

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
  changeName: any,
  send: SendFunction,
) => {
  changeName(send, user, newUserName);
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

  return (
    <div role="none" className={`${visibility(modal.isShowing)} modalBackground absolute left-0 top-0 h-screen w-screen bg-background-900/60 z-40 flex justify-center items-center`} onClick={(event: ClickEvent) => clickBackground(event, modal, user, setNewUserName)}>
      <div className="w-[450px] p-6 first-letter:space-y-6 bg-background-700 rounded-md relative space-y-6">
        <Input placeholder="Change your username" value={newUserName} setValue={setNewUserName} />

        <div className="flex justify-between">
          <Button text="Cancel" colorless onClick={() => cancelModal(modal, user, setNewUserName)} />
          <Button text="Save" onClick={() => saveModal(modal, newUserName, user, setUser, changeUsername, send)} />
        </div>
      </div>
    </div>
  );
};

export default ChangeNameModal;
