import React, { useEffect, useState } from 'react';
import * as R from 'ramda';
import { LockClosedIcon, LockOpenIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { codes } from '../constants';
import {
  equalsForty,
  isValid, requestData, invalidInput, visibility,
} from '../utils';
import Button from './Button';
import Input from './Input';
import useRoom from '../hooks/room';
import useConnection from '../hooks/connection';
import useHelp from '../hooks/help';
import InputButtonGroup from './InputButtonGroup';
import SpaceBetween from './SpaceBetween';

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

const RoomInputGroup = ({
  connection, room, visible, help,
}: {
  connection: ReturnType<typeof useConnection>,
  room: ReturnType<typeof useRoom>,
  visible: boolean,
  help: ReturnType<typeof useHelp>,
}) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [joinInput, setJoinInput] = useState('');
  const [createInput, setCreateInput] = useState('');
  const lockIcon = isPrivate ? <LockClosedIcon /> : <LockOpenIcon className="text-valid" />;
  const lockTitle = isPrivate ? 'Private Room' : 'Public Room';

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
    <div className={`flex flex-col gap-8 ${visibility(visible)}`}>
      <SpaceBetween>
        <h1 className="text-xl font-bold">Join or create a room</h1>
        <Button colorless className="h-7 w-7 px-0 py-0 rounded-full" title="Need some help ?" onClick={() => help.setIsOpen(!help.isOpen)}><QuestionMarkCircleIcon /></Button>
      </SpaceBetween>

      <InputButtonGroup>
        <Input noHelper id="join" className="rounded-r-none" placeholder="Room ID" onKeyPress={joinRoomHandler} value={joinInput} setValue={setJoinInput} />
        <Button className="rounded-l-none w-24 px-1" onClick={joinRoomHandler} disabled={!equalsForty(joinInput)}>Join</Button>
      </InputButtonGroup>

      <InputButtonGroup>
        <Input id="create" className="rounded-r-none" placeholder="Room name" onKeyPress={createRoomHandler} value={createInput} setValue={setCreateInput} />
        <Button className="px-2 h-10 w-11 rounded-none" colorless onClick={keyLockHandler} onKeyPress={keyLockHandler} title={lockTitle}>{lockIcon}</Button>
        <Button colorless className="rounded-l-none w-28 px-1" onClick={createRoomHandler} disabled={!isValid(createInput)}>Create</Button>
      </InputButtonGroup>
    </div>
  );
};

export default RoomInputGroup;
