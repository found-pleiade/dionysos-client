/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import {
  isValid, requestData, unvalidInput,
} from '../utils';
import {
  SetUser, User, SendFunction, UrlType, ErrorsType,
} from '../utils/types';
import { codes } from '../constants';
import ConnectModal from '../components/ConnectModal';
import useModal from '../hooks/modal';

/**
 * Setup the request for changing username, which here allow to set your username
 * for the first time.
 */
const requestCHU = (username: string) => requestData(
  codes.request.changeUserName,
  { newUsername: username },
);

type connectProps = {
  send: SendFunction,
  user: User,
  setUser: SetUser,
  isConnected: boolean,
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  url: UrlType,
  setWebSocket: React.Dispatch<React.SetStateAction<WebSocket | undefined>>,
  errors: ErrorsType,
}

const Connect = ({
  send,
  user,
  setUser,
  isConnected,
  setIsConnected,
  url,
  setWebSocket,
  errors,
}: connectProps) => {
  /**
   * React Router hook to navigate to the home page.
   */
  const navigate = useNavigate();
  /**
   * Hook to open and close the connect modal.
   */
  const modal = useModal();
  const [username, setUsername] = useState('');
  const [valid, setValid] = useState(false);
  const validAndConnected = valid && isConnected;
  const buttonText = isConnected ? 'Join' : 'Connecting...';

  /**
   * Send the username to the server and set the username in the app.
   * Handles both click and keyboard inputs.
   */
  const connectionHandler = (event?: any) => {
    if (unvalidInput(event, 'connect')) return;
    if (!validAndConnected) return;

    send(requestCHU(username));
    setUser({ ...user, name: username });
    navigate('/home');
  };

  /**
   * Update the username state validity on username updates.
   */
  useEffect(() => {
    setValid(isValid(username));
  }, [username]);

  return (
    <div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center flex flex-col items-center">
        <div className="xl:mb-52 md:mb-32 mb-20 absolute bottom-0">
          <h1 className="text-[6rem] -mb-6 font-black uppercase">Dyonisos</h1>
          <h2 className="text-[2rem] font-semibold">Share cinematic experiences.</h2>
        </div>

        <div className="flex space-x-1 w-[50ch]">
          <Input id="connect" className="rounded-r-none" placeholder="Username" value={username} setValue={setUsername} onKeyPress={connectionHandler} />
          <Button className="rounded-l-none" text={buttonText} disabled={!validAndConnected} onClick={connectionHandler} />
        </div>
      </div>

      <div title="Change WebSocket server" onClick={() => modal.toggle()} onKeyPress={(event) => { if (event.code === 'Enter') modal.toggle(); }} tabIndex={0} role="button" className="absolute top-0 right-0 px-2 h-10 w-10 rounded-bl-lg cursor-pointer bg-accent-500 hover:bg-accent-400 focus:outline-pending text-foreground transition-colors flex justify-center items-center">
        <GlobeAltIcon />
      </div>

      <ConnectModal
        modal={modal}
        url={url}
        setWebSocket={setWebSocket}
        setIsConnected={setIsConnected}
        errors={errors}
      />
    </div>
  );
};

export default Connect;
