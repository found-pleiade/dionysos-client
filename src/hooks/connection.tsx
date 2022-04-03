import { useState } from 'react';
import { notNil } from '../utils';
import { DataType, SendFunction } from '../utils/types';

/**
 * Two use function that first set the WebSocket to use then the data to send
 * to the WebSocket.
 */
const send = (socket: WebSocket | undefined): SendFunction => (data: DataType): void => {
  if (notNil(socket)) {
    const definedSocket = socket as WebSocket;
    definedSocket.send(data);
  }
};

export type Connection = {
  webSocket: WebSocket | undefined,
  setWebSocket: React.Dispatch<React.SetStateAction<WebSocket | undefined>>,
  currentUrl: string,
  setCurrentUrl: React.Dispatch<React.SetStateAction<string>>,
  backupUrl: string,
  setBackupUrl: React.Dispatch<React.SetStateAction<string>>,
  isUrlDifferent: boolean,
  isUp: boolean,
  setIsUp: React.Dispatch<React.SetStateAction<boolean>>,
  send: SendFunction,
};

const useConnection = (devServer: string) => {
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [currentUrl, setCurrentUrl] = useState(devServer);
  const [backupUrl, setBackupUrl] = useState(devServer);
  const [isUp, setIsUp] = useState(false);

  return {
    webSocket,
    setWebSocket,
    currentUrl,
    setCurrentUrl,
    backupUrl,
    setBackupUrl,
    isUrlDifferent: currentUrl !== backupUrl,
    isUp,
    setIsUp,
    send: send(webSocket),
  };
};

export default useConnection;
