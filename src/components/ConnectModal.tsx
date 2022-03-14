import { XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { visibility } from '../utils';
import { ModalType } from '../utils/types';
import Button from './Button';
import Input from './Input';

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

const cancelModal = (
  modal: ModalType,
  oldServerUrl: string,
  setServerUrl: any,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setValidConnection: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setServerUrl(oldServerUrl);
  setIsConnected(true);
  setValidConnection(true);
  modal.toggle();
};

const saveModal = (
  modal: ModalType,
  newServerUrl: string,
  setWebSocket: React.Dispatch<React.SetStateAction<WebSocket>>,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setValidConnection: React.Dispatch<React.SetStateAction<boolean>>,
  setOldServerUrl: React.Dispatch<React.SetStateAction<string>>,
) => {
  setIsConnected(false);
  const socket = new WebSocket(newServerUrl);

  socket.onopen = () => {
    setIsConnected(true);
    setValidConnection(true);
    setWebSocket(socket);
    setOldServerUrl(newServerUrl);
    modal.toggle();
  };

  socket.onclose = () => {
    setValidConnection(false);
  };
};

const clickBackground = (
  event: ClickEvent,
  modal: ModalType,
  oldServerUrl: string,
  setServerUrl: any,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setValidConnection: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const el = event.target as HTMLDivElement;
  if (el.classList.contains('modalBackground')) cancelModal(modal, oldServerUrl, setServerUrl, setIsConnected, setValidConnection);
};

type ConnectModalProps = {
  modal: ModalType,
  serverUrl: string,
  setServerUrl: React.Dispatch<React.SetStateAction<string>>,
  oldServerUrl: string,
  setOldServerUrl: React.Dispatch<React.SetStateAction<string>>,
  setWebSocket: React.Dispatch<React.SetStateAction<WebSocket>>,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
}

const ConnectModal = ({
  modal,
  serverUrl,
  setServerUrl,
  oldServerUrl,
  setOldServerUrl,
  setWebSocket,
  setIsConnected,
}: ConnectModalProps) => {
  const [validConnection, setValidConnection] = useState(true);

  return (
    <div role="none" className={`${visibility(modal.isShowing)} modalBackground absolute left-0 top-0 h-screen w-screen bg-neutral-900/60 z-10 flex justify-center items-center`} onClick={(event: ClickEvent) => clickBackground(event, modal, oldServerUrl, setServerUrl, setIsConnected, setValidConnection)}>
      <div className="w-[450px] p-6 first-letter:space-y-6 bg-neutral-800 rounded-md relative space-y-6">
        <XIcon className="h-6 w-6 absolute right-6 top-6 cursor-pointer hover:text-neutral-400" onClick={() => modal.toggle()} />

        <div>
          <h2 className="mb-2">Set your WebSocket server here</h2>
          <Input value={serverUrl} setValue={setServerUrl} isValid={validConnection} />
        </div>

        <div className="flex justify-between">
          <Button text="Cancel" colorless onClick={() => cancelModal(modal, oldServerUrl, setServerUrl, setIsConnected, setValidConnection)} />
          <Button text="Save" onClick={() => saveModal(modal, serverUrl, setWebSocket, setIsConnected, setValidConnection, setOldServerUrl)} />
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
