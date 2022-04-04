/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import {
  isValid, requestData, invalidInput,
} from '../utils';
import { MessagesType } from '../utils/types';
import { codes } from '../constants';
import ConnectModal from '../components/ConnectModal';
import useModal from '../hooks/modal';
import WebSocketButton from '../components/WebSocketButton';
import useConnection from '../hooks/connection';
import useUsers from '../hooks/users';

/**
 * Setup the request for changing username, which here allow to set your username
 * for the first time.
 */
const requestCHU = (username: string) => requestData(
  codes.request.changeUserName,
  { newUsername: username },
);

const Connect = ({
  connection,
  users,
  messages,
}: {
  connection: ReturnType<typeof useConnection>,
  users: ReturnType<typeof useUsers>,
  messages: MessagesType,
}) => {
  const modal = useModal();
  const [username, setUsername] = useState('');
  const validAndConnected = () => isValid(username) && connection.isUp;
  const buttonText = () => (connection.isUp ? 'Next' : 'No connection');

  /**
   * Send the username to the server and set the username in the app.
   * Handles both click and keyboard inputs.
   */
  const connectionHandler = (event?: any) => {
    if (invalidInput(event)) return;
    if (!validAndConnected()) return;

    connection.send(requestCHU(username));
    users.setCurrent({ ...users.current, name: username });
    useNavigate()('/home');
  };

  return (
    <>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center flex flex-col items-center">
        <header className="xl:mb-52 md:mb-32 mb-20 absolute bottom-0">
          <h1 className="text-[6rem] -mb-6 font-black uppercase">Dyonisos</h1>
          <h2 className="text-[2rem] font-semibold">Share cinematic experences.</h2>
        </header>

        <div className="flex space-x-1 w-[50ch]">
          <Input id="connect" className="rounded-r-none" placeholder="Username" value={username} setValue={setUsername} onKeyPress={connectionHandler} />
          <Button className="rounded-l-none" text={buttonText()} disabled={!validAndConnected()} onClick={connectionHandler} />
        </div>
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
