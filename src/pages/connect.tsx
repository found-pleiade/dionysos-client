/* eslint-disable no-underscore-dangle */
import React from 'react';
import * as R from 'ramda';
import Button from '../components/Button';
import Input from '../components/Input';
import { sendFunction } from '../constants';
import { requestData } from '../utils';
import { SetUser, User } from '../utils/types';

const gtZero = (x: string) => R.gt(R.length(x), 0);

const ltFifty = (x: string) => R.lt(R.length(x), 50);

const isValid = R.allPass([gtZero, ltFifty]);

const requestNCO = (user: User) => requestData('NCO', { username: user.name, salt: user.salt });

const sendUsername = (
  isValidUsername: boolean,
  send: sendFunction,
  user: User,
) => R.ifElse(
  () => isValidUsername,
  () => send(requestNCO(user)),
  () => null,
);

const setValue = (user: User, setUser: SetUser) => (x: string) => setUser({ ...user, name: x });

type connectProps = {
  send: sendFunction,
  user: User,
  setUser: SetUser,
  isConnected: boolean,
}

const Connect = ({
  send, user, setUser, isConnected,
}: connectProps) => {
  const isValidUsername = R.not(R.isNil(user.name)) ? isValid(user.name as string) : false;
  const validAndConnected = isValidUsername && isConnected;
  const buttonText = isConnected ? 'Join' : 'Waiting for the server...';

  return (
    <div className="bg-neutral-800 h-[250px] w-[600px] rounded-lg relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-between flex-col p-6">
      <h1 className="text-center font-medium text-2xl">Welcome to Dyonisos</h1>
      <div>
        <h2 className="mb-2">Choose your username</h2>
        <Input value={user.name} setValue={setValue(user, setUser)} />
      </div>
      <div className="flex justify-between">
        <div />
        <Button to="/home" text={buttonText} colorless={!validAndConnected} disabled={!validAndConnected} onClick={sendUsername(validAndConnected, send, user)} />
      </div>
    </div>
  );
};

export default Connect;
