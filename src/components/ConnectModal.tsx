import React, {
  useEffect, useRef,
} from 'react';
import useConnection from '../hooks/connection';
import useInputStatusIcon from '../hooks/inputStatusIcon';
import useMessages from '../hooks/messages';
import useModal from '../hooks/modal';
import { preventDialogEscape, toggleDialog } from '../utils';
import Button from './Button';
import Input from './Input';
import RowGroup from './RowGroup';
import SpaceBetween from './SpaceBetween';

/**
 * Cancel user interractions with the modal then close it.
 */
const cancelModal = (
  connection: ReturnType<typeof useConnection>,
  modal: ReturnType<typeof useModal>,
  messages: ReturnType<typeof useMessages>,
  inputStatusIcon: ReturnType<typeof useInputStatusIcon>,
) => () => {
  if (!connection.isUp && !connection.isUrlDifferent) { modal.toggle(); return; }

  connection.setIsUp(true);
  inputStatusIcon.setCurrent(inputStatusIcon.icons.valid);
  messages.clear();
  connection.setCurrentUrl(connection.backupUrl);
  modal.toggle();
};

/**
 * Try to connect to the WebSocket and update the app only if it's valid.
 */
const saveModal = (
  connection: ReturnType<typeof useConnection>,
  modal: ReturnType<typeof useModal>,
  messages: ReturnType<typeof useMessages>,
  inputStatusIcon: ReturnType<typeof useInputStatusIcon>,
) => () => {
  if (connection.currentUrl === connection.backupUrl && connection.isUp) { modal.toggle(); return; }

  connection.setIsUp(false);
  inputStatusIcon.setCurrent(inputStatusIcon.icons.pending);

  try {
    const socket = new WebSocket(connection.currentUrl);

    socket.onopen = () => {
      connection.setWebSocket(socket);
      connection.setIsUp(true);
      inputStatusIcon.setCurrent(inputStatusIcon.icons.valid);
      messages.clear();
      connection.setBackupUrl(connection.currentUrl);
      modal.toggle();
    };

    socket.onclose = (event) => {
      inputStatusIcon.setCurrent(inputStatusIcon.icons.error);
      messages.add(`${event.code} : Maybe Wrong Web Socket address or server side mistake (wss://subdomain.domain.extension)`, 'error');
    };
  } catch (error) {
    const knownError = error as Error;
    inputStatusIcon.setCurrent(inputStatusIcon.icons.error);
    messages.add(knownError.message, 'error');
  }
};

const ConnectModal = ({
  connection,
  modal,
  messages,
}: {
  connection: ReturnType<typeof useConnection>,
  modal: ReturnType<typeof useModal>,
  messages: ReturnType<typeof useMessages>,
}) => {
  const inputStatusIcon = useInputStatusIcon(connection.isUp);
  const cancelModalHandler = cancelModal(connection, modal, messages, inputStatusIcon);
  const saveModalHandler = saveModal(connection, modal, messages, inputStatusIcon);

  /**
   * HTMLDialogElement is not support by TypeScript, but that's what
   * the type is.
   */
  const dialogRef = useRef() as any;
  useEffect(() => {
    preventDialogEscape(dialogRef);
    toggleDialog(modal.isOpen, dialogRef);
  }, [modal]);

  /**
   * Set the icon depending of the connection status.
   */
  useEffect(() => {
    inputStatusIcon.setCurrent(
      connection.isUp ? inputStatusIcon.icons.valid : inputStatusIcon.icons.error,
    );
  }, [connection]);

  return (
    <dialog ref={dialogRef} className="min-w-[55ch] p-6 first-letter:space-y-6 bg-background-700 rounded-md relative space-y-6 text-foreground">
      <div>
        <h3 className="mb-2 font-medium">WebSocket server</h3>
        <RowGroup>
          <Input id="connection" noHelper className="rounded-r-none" value={connection.currentUrl} setValue={connection.setCurrentUrl} />
          {inputStatusIcon.current}
        </RowGroup>
      </div>

      <SpaceBetween>
        <Button onClick={cancelModalHandler} colorless>Cancel</Button>
        <Button onClick={saveModalHandler}>Save</Button>
      </SpaceBetween>
    </dialog>
  );
};

export default ConnectModal;
