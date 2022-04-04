import React, { useEffect, useState } from 'react';
import * as R from 'ramda';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { codes } from '../constants';
import {
  equalsForty,
  isValid, requestData, invalidInput,
} from '../utils';
import Button from './Button';
import LockToggle from './LockToggle';
import Input from './Input';
import useRoom from '../hooks/room';
import useConnection from '../hooks/connection';
import useHelp from '../hooks/help';

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
  connection: ReturnType<typeof useConnection>,
  room: ReturnType<typeof useRoom>,
  className: string,
  help: ReturnType<typeof useHelp>,
}

const RoomInputGroup = ({
  connection, room, className, help,
}: RoomInputGroupProps) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [joinInput, setJoinInput] = useState('');
  const [createInput, setCreateInput] = useState('');

  useEffect(() => {
    if (R.length(room.current.name) <= 0) {
      setJoinInput('');
      setCreateInput('');
    }
  }, [room]);

  /**
   * Toggle the private room state.
   */
  const keyLockHandler = (event?: any) => {
    if (invalidInput(event)) return;
    setIsPrivate(!isPrivate);
  };

  /**
   * If checks passes, send the request to join a room.
   */
  const joinRoomHandler = (event?: any) => {
    if (invalidInput(event)) return;
    if (!equalsForty(joinInput)) return;

    help.setIsOpen(false);
    connection.send(requestJRO(joinInput));
  };

  /**
   * If checks passes, send the request to create a room and set the room state of the app.
   */
  const createRoomHandler = (event?: any) => {
    if (invalidInput(event)) return;
    if (!isValid(createInput)) return;

    help.setIsOpen(false);
    room.setCurrent({ ...room.current, name: createInput, isPrivate });
    connection.send(requestNRO(createInput, isPrivate));
  };

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <div className="flex justify-between items-center -mb-2">
        <h1 className="text-xl font-bold">Join or create a room</h1>
        <button type="button" className="h-8 w-8 p-1 hover:text-accent-400 hover:brightness-[1.2] rounded-full" title="Need some help ?" onClick={() => help.setIsOpen(!help.isOpen)}>
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
