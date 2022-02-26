import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

type connectProps = {
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>
}

const Connect = ({ username, setUsername }: connectProps) => (
  <div className="bg-neutral-800 h-[250px] w-[500px] rounded-lg relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-between flex-col p-6">
    <h1 className="text-center font-medium text-2xl">Welcome to Dyonisos</h1>
    <div>
      <h2 className="mb-2">Choose your username</h2>
      <Input value={username} setValue={setUsername} />
    </div>
    <div className="flex justify-between">
      <div />
      <Button to="/home" text="Join" />
    </div>
  </div>
);

export default Connect;
