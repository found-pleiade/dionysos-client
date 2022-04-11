import { useEffect, useState } from 'react';
import { notNil } from '../utils';
import { DataType } from '../utils/types';
import useInputStatusIcon from './inputStatusIcon';
import useMessages from './messages';
import useModal from './modal';

const useConnection = (
  devServer: string,
  messages: ReturnType<typeof useMessages>,
  ref: any,
) => {
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [currentUrl, setCurrentUrl] = useState(devServer);
  const [backupUrl, setBackupUrl] = useState(devServer);
  const [isUp, setIsUp] = useState(false);
  const inputStatusIcon = useInputStatusIcon(isUp);
  const modal = useModal(ref);

  /**
 * Two use function that first set the WebSocket to use then the data to send
 * to the WebSocket.
 */
  const send = (data: DataType): void => {
    if (notNil(webSocket)) {
      const definedSocket = webSocket as WebSocket;
      definedSocket.send(data);
    }
  };

  const isBackupDifferent = () => currentUrl !== backupUrl;

  const onPending = () => {
    setIsUp(false);
    inputStatusIcon.setCurrent(inputStatusIcon.icons.pending);
  };

  const onOpen = (socket: WebSocket) => () => {
    setWebSocket(socket);
    setIsUp(true);
    inputStatusIcon.setCurrent(inputStatusIcon.icons.valid);
    messages.clear();
    setBackupUrl(currentUrl);
    modal.toggle(600);
  };

  const onClose = (event: any) => {
    inputStatusIcon.setCurrent(inputStatusIcon.icons.error);
    messages.add(`${event.code} : Maybe Wrong Web Socket address or server side mistake (wss://subdomain.domain.extension)`, 'error');
  };

  const onError = (error: any) => {
    const knownError = error as Error;
    inputStatusIcon.setCurrent(inputStatusIcon.icons.error);
    messages.add(knownError.message, 'error');
  };

  const saveModal = () => {
    if (currentUrl === backupUrl && isUp) {
      modal.toggle();
      return;
    }

    try {
      onPending();
      const socket = new WebSocket(currentUrl);
      socket.onopen = onOpen(socket);
      socket.onclose = onClose;
    } catch (error) {
      onError(error);
    }
  };

  const cancelModal = () => {
    if (!isUp && !isBackupDifferent()) {
      modal.toggle();
      return;
    }

    messages.clear();
    setIsUp(true);
    inputStatusIcon.setCurrent(inputStatusIcon.icons.valid);
    setCurrentUrl(backupUrl);
    modal.toggle();
  };

  useEffect(() => {
    inputStatusIcon.setCurrent(
      isUp ? inputStatusIcon.icons.valid : inputStatusIcon.icons.error,
    );
  }, [isUp]);

  return {
    modal: {
      ...modal,
      save: saveModal,
      cancel: cancelModal,
    },
    webSocket,
    setWebSocket,
    url: {
      current: currentUrl,
      setCurrent: setCurrentUrl,
      backup: backupUrl,
      setBackup: setBackupUrl,
      isBackupDifferent,
    },
    isUp,
    setIsUp,
    send,
    currentStatusIcon: inputStatusIcon.current,
  };
};

export default useConnection;
