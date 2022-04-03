/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import {
  isValid, requestData, unvalidInput,
} from '../utils';
import {
  SetUser, User, MessagesType,
} from '../utils/types';
import { codes } from '../constants';
import ConnectModal from '../components/ConnectModal';
import useModal from '../hooks/modal';
import BigTitle from '../components/BigTitle';
import WebSocketButton from '../components/WebSocketButton';
import { Connection } from '../hooks/connection';

/**
 * Setup the request for changing username, which here allow to set your username
 * for the first time.
 */
const requestCHU = (username: string) => requestData(
  codes.request.changeUserName,
  { newUsername: username },
);

type connectProps = {
  connection: Connection,
  user: User,
  setUser: SetUser,
  messages: MessagesType,
}

const Connect = ({
  connection,
  user,
  setUser,
  messages,
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
  const validAndConnected = isValid(username) && connection.isUp;
  const buttonText = connection.isUp ? 'Next' : 'No connection';

  /**
   * Send the username to the server and set the username in the app.
   * Handles both click and keyboard inputs.
   */
  const connectionHandler = (event?: any) => {
    if (unvalidInput(event)) return;
    if (!validAndConnected) return;

    connection.send(requestCHU(username));
    setUser({ ...user, name: username });
    navigate('/home');
  };

  return (
    <>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center flex flex-col items-center">
        <BigTitle title="Dyonisos" subtitle="Share cinematic experences." className="xl:mb-52 md:mb-32 mb-20 absolute bottom-0" />

        <form className="flex space-x-1 w-[50ch]">
          <Input id="connect" className="rounded-r-none" placeholder="Username" value={username} setValue={setUsername} onKeyPress={connectionHandler} />
          <Button className="rounded-l-none" text={buttonText} disabled={!validAndConnected} onClick={connectionHandler} />
        </form>
      </div>

      <WebSocketButton modal={modal} />

      <ConnectModal
        connection={connection}
        modal={modal}
        messages={messages}
      />
    </>
  );
};

export default Connect;
