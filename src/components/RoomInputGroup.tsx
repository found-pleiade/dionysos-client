import React, { useEffect, useState } from 'react';
import * as R from 'ramda';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { codes } from '../constants';
import {
  equalsForty,
  isValid, requestData, unvalidInput,
} from '../utils';
import {
  Room, SendFunction, SetRoom,
} from '../utils/types';
import Button from './Button';
import LockToggle from './LockToggle';
import Input from './Input';

/**
 * Setup the request for joining a room.
 */
const requestJRO = (roomid: string) => requestData(
  codes.request.joinRoom,
  { roomid },
);

/**
 * Setup the request for creating a room.
 */
const requestNRO = (roomname: string, isPrivate: boolean) => requestData(
  codes.request.roomCreation,
  { roomname, isPrivate },
);

type RoomInputGroupProps = {
  send: SendFunction,
  room: Room,
  setRoom: SetRoom,
  className: string,
  help: boolean,
  setHelp: React.Dispatch<React.SetStateAction<boolean>>,
}

const RoomInputGroup = ({
  send, room, setRoom, className, help, setHelp,
}: RoomInputGroupProps) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [joinInput, setJoinInput] = useState('');
  const [createInput, setCreateInput] = useState('');

  useEffect(() => {
    if (R.length(room.name) <= 0) {
      setJoinInput('');
      setCreateInput('');
    }
  }, [room]);

  /**
   * Toggle the private room state.
   */
  const keyLockHandler = (event?: any) => {
    if (unvalidInput(event, 'lock')) return;
    setIsPrivate(!isPrivate);
  };

  /**
   * If checks passes, send the request to join a room.
   */
  const joinRoomHandler = (event?: any) => {
    if (unvalidInput(event, 'join')) return;
    if (!equalsForty(joinInput)) return;

    send(requestJRO(joinInput));
  };

  /**
   * If checks passes, send the request to create a room and set the room state of the app.
   */
  const createRoomHandler = (event?: any) => {
    if (unvalidInput(event, 'create')) return;
    if (!isValid(createInput)) return;

    setRoom({ ...room, name: createInput });
    send(requestNRO(createInput, isPrivate));
  };

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <div className="flex justify-between items-center -mb-2">
        <h1 className="text-xl font-bold">Join or create a room</h1>
        <button type="button" className="h-8 w-8 p-1 hover:text-accent-400 hover:brightness-[1.2] rounded-full" title="Need some help ?" onClick={() => setHelp(!help)}>
          <QuestionMarkCircleIcon />
        </button>
      </div>

      <div className="flex space-x-1">
        <Input noHelper id="join" className="rounded-r-none" placeholder="Room ID" onKeyPress={joinRoomHandler} value={joinInput} setValue={setJoinInput} />
        <Button className="rounded-l-none w-24 px-1" text="Join" onClick={joinRoomHandler} disabled={!equalsForty(joinInput)} />
      </div>

      <div className="flex space-x-1">
        <Input id="create" className="rounded-r-none" placeholder="Room name" onKeyPress={createRoomHandler} value={createInput} setValue={setCreateInput} />
        <LockToggle toggle={isPrivate} onClick={keyLockHandler} onKeyPress={keyLockHandler} />
        <Button colorless className="rounded-l-none w-28 px-1" text="Create" onClick={createRoomHandler} disabled={!isValid(createInput)} />
      </div>
    </div>
  );
};

export default RoomInputGroup;
