import { CheckIcon, DotsHorizontalIcon, XIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { visibility } from '../utils';
import { MessagesType, ModalType, UrlType } from '../utils/types';
import Button from './Button';
import Input from './Input';

type ConnectModalProps = {
  modal: ModalType,
  url: UrlType,
  setWebSocket: React.Dispatch<React.SetStateAction<WebSocket | undefined>>,
  isConnected: boolean,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  messages: MessagesType,
}

const ConnectModal = ({
  modal,
  url,
  setWebSocket,
  isConnected,
  setIsConnected,
  messages: errors,
}: ConnectModalProps) => {
  const iconStyle = 'h-10 p-2 rounded-r-lg';

  const icons = {
    valid: <CheckIcon className={`${iconStyle} bg-valid`} />,
    error: <XIcon className={`${iconStyle} bg-error`} />,
    pending: <DotsHorizontalIcon className={`${iconStyle} bg-pending animate-pulse-slow`} />,
  };

  const [connectionStatus, setConnectionStatus] = useState(isConnected ? icons.valid : icons.error);

  useEffect(() => {
    setConnectionStatus(isConnected ? icons.valid : icons.error);
  }, [isConnected]);

  /**
   * Cancel user interractions with the modal then close it.
   */
  const cancelModal = (event?: any) => {
    const isBackground = event.target.classList.contains('modalBackground');
    const isCancelButton = event.target.id === 'cancelConnection';

    if (!isBackground && !isCancelButton) return;
    if (!isConnected && url.current === url.backup) { modal.toggle(); return; }

    url.setCurrent(url.backup);
    setIsConnected(true);
    setConnectionStatus(icons.valid);
    modal.toggle();
  };

  /**
   * Try to connect to the WebSocket and update the app only if it's valid.
   */
  const saveModal = () => {
    if (url.current === url.backup && isConnected) { modal.toggle(); return; }

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
        errors.add(`${event.code} : Maybe Wrong Web Socket address or server side mistake (wss://subdomain.domain.extension)`, 'error');
        setConnectionStatus(icons.error);
      };
    } catch (error) {
      const knownError = error as Error;
      errors.add(knownError.message, 'error');
      setConnectionStatus(icons.error);
    }
  };

  return (
    <div role="none" className={`${visibility(modal.isShowing)} modalBackground absolute left-0 top-0 h-screen w-screen bg-background-900/60 z-10 flex justify-center items-center`} onMouseDown={cancelModal}>
      <div className="w-[55ch] p-6 first-letter:space-y-6 bg-background-700 rounded-md relative space-y-6">
        <div>
          <h2 className="mb-2 font-medium">WebSocket server</h2>
          <div className="flex space-x-1">
            <Input noHelper className="rounded-r-none" value={url.current} setValue={url.setCurrent} />
            {connectionStatus}
          </div>
        </div>

        <div className="flex justify-between">
          <Button id="cancelConnection" text="Cancel" colorless onClick={cancelModal} />
          <Button id="saveConnection" text="Save" onClick={saveModal} />
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
