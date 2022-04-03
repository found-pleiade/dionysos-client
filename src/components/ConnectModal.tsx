import { CheckIcon, DotsHorizontalIcon, XIcon } from '@heroicons/react/solid';
import React, {
  useEffect, useRef, useState,
} from 'react';
import { ModalType } from '../hooks/modal';
import { preventDialogEscape, toggleDialog } from '../utils';
import { MessagesType, UrlType } from '../utils/types';
import Button from './Button';
import Input from './Input';

/**
 * Return icons for the connect modal, using the icon style provided.
 */
const formatIcons = (iconStyle: string) => ({
  valid: <CheckIcon className={`${iconStyle} bg-valid`} />,
  error: <XIcon className={`${iconStyle} bg-error`} />,
  pending: <DotsHorizontalIcon className={`${iconStyle} bg-pending animate-pulse-slow`} />,
});

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
  messages,
}: ConnectModalProps) => {
  /**
   * HTMLDialogElement is not support by TypeScript, but that's what
   * the type is.
   */
  const icons = formatIcons('h-10 p-2 rounded-r-lg');
  const [connectionStatus, setConnectionStatus] = useState(isConnected ? icons.valid : icons.error);

  const dialogRef = useRef() as any;
  useEffect(() => {
    preventDialogEscape(dialogRef);
    toggleDialog(modal.isOpen, dialogRef);
  }, [modal]);

  /**
   * Set the icon depending of the connection status.
   */
  useEffect(() => {
    setConnectionStatus(isConnected ? icons.valid : icons.error);
  }, [isConnected]);

  /**
   * Cancel user interractions with the modal then close it.
   */
  const cancelModal = () => {
    if (!isConnected && url.current === url.backup) { modal.toggle(); return; }

    setIsConnected(true);
    setConnectionStatus(icons.valid);
    messages.clear();
    url.setCurrent(url.backup);
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
        setIsConnected(true);
        setConnectionStatus(icons.valid);
        messages.clear();
        url.setBackup(url.current);
        modal.toggle();
      };

      socket.onclose = (event) => {
        setConnectionStatus(icons.error);
        messages.add(`${event.code} : Maybe Wrong Web Socket address or server side mistake (wss://subdomain.domain.extension)`, 'error');
      };
    } catch (error) {
      const knownError = error as Error;
      setConnectionStatus(icons.error);
      messages.add(knownError.message, 'error');
    }
  };

  return (
    <dialog ref={dialogRef} className="min-w-[55ch] p-6 first-letter:space-y-6 bg-background-700 rounded-md relative space-y-6 text-foreground">
      <div>
        <h2 className="mb-2 font-medium">WebSocket server</h2>
        <div className="flex space-x-1">
          <Input noHelper className="rounded-r-none" value={url.current} setValue={url.setCurrent} />
          {connectionStatus}
        </div>
      </div>

      <div className="flex justify-between">
        <Button text="Cancel" colorless onClick={cancelModal} />
        <Button text="Save" onClick={saveModal} />
      </div>
    </dialog>
  );
};

export default ConnectModal;
