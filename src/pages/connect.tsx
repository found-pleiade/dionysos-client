/* eslint-disable no-underscore-dangle */
import React from 'react';
import * as R from 'ramda';
import Button from '../components/Button';
import Input from '../components/Input';
import { sendFunction } from '../constants';
import { requestData } from '../utils';

const gtZero = (x: string) => R.gt(R.length(x), 0);

const ltFifty = (x: string) => R.lt(R.length(x), 50);

const isValid = R.allPass([gtZero, ltFifty]);

const requestNCO = (username: string) => requestData('NCO', { username });

const sendUsername = (
  isValidUsername: boolean,
  send: sendFunction,
  username: string,
) => R.ifElse(
  () => isValidUsername,
  () => send(requestNCO(username)),
  () => null,
);

type connectProps = {
  send: sendFunction,
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>
  isConnected: boolean,
}

const Connect = ({
  send, username, setUsername, isConnected,
}: connectProps) => {
  const isValidUsername = isValid(username);
  const validAndConnected = isValidUsername && isConnected;
  const buttonText = isConnected ? 'Join' : 'Waiting for the server...';

  return (
    <div className="bg-neutral-800 h-[250px] w-[600px] rounded-lg relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-between flex-col p-6">
      <h1 className="text-center font-medium text-2xl">Welcome to Dyonisos</h1>
      <div>
        <h2 className="mb-2">Choose your username</h2>
        <Input value={username} setValue={setUsername} />
      </div>
      <div className="flex justify-between">
        <div />
        <Button to="/home" text={buttonText} colorless={!validAndConnected} disabled={!validAndConnected} onClick={sendUsername(validAndConnected, send, username)} />
      </div>
    </div>
  );
};

export default Connect;
