import { CheckIcon, DotsHorizontalIcon, XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { visibility } from '../utils';
import { ErrorsType, ModalType, UrlType } from '../utils/types';
import Button from './Button';
import Input from './Input';

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

const cancelModal = (
  modal: ModalType,
  url: UrlType,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setConnectionStatus: React.Dispatch<React.SetStateAction<JSX.Element>>,
  icons: any,
) => {
  url.setCurrent(url.backup);
  setIsConnected(true);
  setConnectionStatus(icons.valid);
  modal.toggle();
};

const saveModal = (
  modal: ModalType,
  url: UrlType,
  setWebSocket: React.Dispatch<React.SetStateAction<WebSocket | undefined>>,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setConnectionStatus: React.Dispatch<React.SetStateAction<JSX.Element>>,
  errors: ErrorsType,
  icons: any,
) => {
  if (url.current === url.backup && errors.get.length === 0) {
    modal.toggle();
    return;
  }

  setIsConnected(false);
  setConnectionStatus(icons.pending);

  try {
    const socket = new WebSocket(url.current);

    socket.onopen = () => {
      setWebSocket(socket);
      url.setBackup(url.current);
      setIsConnected(true);
      setConnectionStatus(icons.valid);
      modal.toggle();
    };

    socket.onclose = (event) => {
      errors.add(`${event.code} : Probably a wrong Web Socket address or a mistake server side (wss://subdomain.domain.extension)`);
      setConnectionStatus(icons.error);
    };
  } catch (error) {
    const knownError = error as unknown as Error;
    errors.add(knownError.message);
    setConnectionStatus(icons.error);
  }
};

const clickBackground = (
  event: ClickEvent,
  modal: ModalType,
  url: UrlType,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setConnectionStatus: React.Dispatch<React.SetStateAction<JSX.Element>>,
  icons: any,
) => {
  const el = event.target as HTMLDivElement;
  if (el.classList.contains('modalBackground')) cancelModal(modal, url, setIsConnected, setConnectionStatus, icons);
};

type ConnectModalProps = {
  modal: ModalType,
  url: UrlType,
  setWebSocket: React.Dispatch<React.SetStateAction<WebSocket | undefined>>,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  errors: ErrorsType,
}

const ConnectModal = ({
  modal,
  url,
  setWebSocket,
  setIsConnected,
  errors,
}: ConnectModalProps) => {
  const icons = {
    valid: <CheckIcon className="bg-valid h-10 p-2 rounded-r-lg" />,
    error: <XIcon className="bg-error h-10 p-2 rounded-r-lg" />,
    pending: <DotsHorizontalIcon className="bg-pending h-10 p-2 rounded-r-lg animate-pulse-slow" />,
  };

  const [connectionStatus, setConnectionStatus] = useState(icons.valid);

  return (
    <div role="none" className={`${visibility(modal.isShowing)} modalBackground absolute left-0 top-0 h-screen w-screen bg-background-900/60 z-10 flex justify-center items-center`} onClick={(event: ClickEvent) => clickBackground(event, modal, url, setIsConnected, setConnectionStatus, icons)}>
      <div className="w-[450px] p-6 first-letter:space-y-6 bg-background-700 rounded-md relative space-y-6">
        <div>
          <h2 className="mb-2 font-medium">WebSocket server</h2>
          <div className="flex space-x-1">
            <Input className="rounded-r-none" value={url.current} setValue={url.setCurrent} />
            {connectionStatus}
          </div>
        </div>

        <div className="flex justify-between">
          <Button text="Cancel" colorless onClick={() => cancelModal(modal, url, setIsConnected, setConnectionStatus, icons)} />
          <Button text="Save" onClick={() => saveModal(modal, url, setWebSocket, setIsConnected, setConnectionStatus, errors, icons)} />
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
