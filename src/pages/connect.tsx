/* eslint-disable no-underscore-dangle */
import React from 'react';
import * as R from 'ramda';
import Button from '../components/Button';
import Input from '../components/Input';
import { sendFunction } from '../constants';

const gtZero = R.gt(R.__, 0);

const ltFifty = R.lt(R.__, 50);

const isValid = R.allPass([gtZero, ltFifty]);

const usernameToNCO = (username: string) => JSON.stringify({ code: 'NCO', payload: username });

const sendUsername = (
  isValidUsername: boolean,
  send: sendFunction,
  username: string,
) => R.ifElse(
  () => isValidUsername,
  () => send(usernameToNCO(username)),
  () => null,
);

type connectProps = {
  send: sendFunction,
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>
}

const Connect = ({ send, username, setUsername }: connectProps) => {
  const isValidUsername = isValid(R.length(username));

  const buttonText = isValidUsername ? 'Never gonna give you up' : 'You know the rules, and so do I';

  return (
    <div className="bg-neutral-800 h-[250px] w-[600px] rounded-lg relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-between flex-col p-6">
      <h1 className="text-center font-medium text-2xl">Welcome to Dyonisos</h1>
      <div>
        <h2 className="mb-2">We&apos;re no strangers to love</h2>
        <Input value={username} setValue={setUsername} />
      </div>
      <div className="flex justify-between">
        <div />
        <Button to="/home" text={buttonText} colorless={!isValidUsername} disabled={!isValidUsername} onClick={sendUsername(isValidUsername, send, username)} />
      </div>
    </div>
  );
};

export default Connect;
