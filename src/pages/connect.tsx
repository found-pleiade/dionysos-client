/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import * as R from 'ramda';
import { GlobeAltIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { isValid, requestData } from '../utils';
import {
  SetUser, User, SendFunction, UrlType, ErrorsType,
} from '../utils/types';
import { codes } from '../constants';
import ConnectModal from '../components/ConnectModal';
import useModal from '../hooks/modal';

const requestNCO = (username: string) => requestData(
  codes.request.connection,
  { username },
);

const sendUsername = (
  isValidUsername: boolean,
  send: SendFunction,
  username: string,
  user: User,
  setUser: SetUser,
) => R.ifElse(
  () => isValidUsername,
  () => {
    send(requestNCO(username));
    setUser({ ...user, name: username });
  },
  () => null,
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
  const modal = useModal();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [valid, setValid] = useState(false);

  const validAndConnected = valid && isConnected;
  const buttonText = isConnected ? 'Join' : 'Connecting...';

  const keypressCallback = (event: KeyboardEvent) => {
    if (event.code === 'Enter' && valid && isConnected) {
      send(user.uuid);
      sendUsername(validAndConnected, send, username, user, setUser)();
      navigate('/home');
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', keypressCallback);

    return () => {
      document.removeEventListener('keypress', keypressCallback);
    };
  }, [username, valid, isConnected]);

  useEffect(() => (isValid(username) ? setValid(true) : setValid(false)), [username]);

  return (
    <div>
      <div className="w-[600px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
        <div className="flex space-x-1">
          <Input className="rounded-r-none" placeholder="Enter your username" value={username} setValue={setUsername} />
          <Button className="rounded-l-none" to="/home" text={buttonText} disabled={!validAndConnected} onClick={sendUsername(validAndConnected, send, username, user, setUser)} />
        </div>
      </div>

      <GlobeAltIcon className="absolute top-0 right-0 px-2 h-10 w-10 rounded-bl-lg cursor-pointer bg-accent-500 hover:bg-accent-400 text-foreground transition-colors" onClick={() => modal.toggle()} onKeyPress={(event) => { if (event.code === 'Enter') modal.toggle(); }} tabIndex={0} />

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
