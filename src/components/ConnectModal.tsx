import React, { useState } from 'react';
import { visibility } from '../utils';
import { ModalType, UrlType } from '../utils/types';
import Button from './Button';
import Input from './Input';

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

const cancelModal = (
  modal: ModalType,
  url: UrlType,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setValidConnection: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  url.setCurrent(url.backup);
  setIsConnected(true);
  setValidConnection(true);
  modal.toggle();
};

const saveModal = (
  modal: ModalType,
  url: UrlType,
  setWebSocket: React.Dispatch<React.SetStateAction<WebSocket>>,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setValidConnection: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsConnected(false);

  try {
    const socket = new WebSocket(url.current);

    socket.onopen = () => {
      setIsConnected(true);
      setValidConnection(true);
      setWebSocket(socket);
      url.setBackup(url.current);
      modal.toggle();
    };

    socket.onclose = () => {
      setValidConnection(false);
    };
  } catch (e) {
    setValidConnection(false);
  }
};

const clickBackground = (
  event: ClickEvent,
  modal: ModalType,
  url: UrlType,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setValidConnection: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const el = event.target as HTMLDivElement;
  if (el.classList.contains('modalBackground')) cancelModal(modal, url, setIsConnected, setValidConnection);
};

type ConnectModalProps = {
  modal: ModalType,
  url: UrlType,
  setWebSocket: React.Dispatch<React.SetStateAction<WebSocket>>,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
}

const ConnectModal = ({
  modal,
  url,
  setWebSocket,
  setIsConnected,
}: ConnectModalProps) => {
  const [validConnection, setValidConnection] = useState(true);

  return (
    <div role="none" className={`${visibility(modal.isShowing)} modalBackground absolute left-0 top-0 h-screen w-screen bg-neutral-900/60 z-10 flex justify-center items-center`} onClick={(event: ClickEvent) => clickBackground(event, modal, url, setIsConnected, setValidConnection)}>
      <div className="w-[450px] p-6 first-letter:space-y-6 bg-neutral-800 rounded-md relative space-y-6">
        <div>
          <h2 className="mb-2">Set your WebSocket server here</h2>
          <Input value={url.current} setValue={url.setCurrent} isValid={validConnection} />
        </div>

        <div className="flex justify-between">
          <Button text="Cancel" colorless onClick={() => cancelModal(modal, url, setIsConnected, setValidConnection)} />
          <Button text="Save" onClick={() => saveModal(modal, url, setWebSocket, setIsConnected, setValidConnection)} />
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
