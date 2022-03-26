import React, { useEffect, useState } from 'react';
import * as R from 'ramda';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { codes } from '../constants';
import {
  isValid, requestData, testActiveElementById, visibility,
} from '../utils';
import {
  Room, SendFunction, SetRoom,
} from '../utils/types';
import Button from './Button';
import LockToggle from './LockToggle';
import Input from './Input';

const newRoom = (
  send: SendFunction,
  room: Room,
  setRoom: SetRoom,
  isPrivate: boolean,
) => {
  setRoom(room);
  send(requestData(
    codes.request.roomCreation,
    { roomname: room.name, isPrivate },
  ));
};

const joinRoom = (
  send: SendFunction,
  roomid: string,
) => {
  send(requestData(
    codes.request.joinRoom,
    { roomid },
  ));
};

const onRoomInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  room: Room,
  setRoom: SetRoom,
) => {
  setRoom({ ...room, name: event.target.value });
};

type RoomInputGroupProps = {
  send: SendFunction,
  room: Room,
  setRoom: SetRoom,
  className: string,
}

const RoomInputGroup = ({
  send, room, setRoom, className,
}: RoomInputGroupProps) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [joinInput, setJoinInput] = useState('');
  const [createInput, setCreateInput] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (R.length(room.name) <= 0) {
      setJoinInput('');
      setCreateInput('');
    }
  }, [room]);

  const handleClick = () => setIsPrivate(!isPrivate);
  const handleKeyPress = (event: any) => {
    if (event.code === 'Enter') setIsPrivate(!isPrivate);
  };

  const joinRoomHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (R.isNil(event.target.parentElement)) return;
    const inputEl = event.target.parentElement.firstElementChild as HTMLInputElement;
    const roomId = inputEl.value;
    if (R.length(roomId) === 40) {
      joinRoom(send, inputEl.value);
    }
  };

  const newRoomHandler = () => {
    if (R.not(isValid(room.name))) return;
    newRoom(send, room, setRoom, isPrivate);
  };

  const handleKeyPressInput = (id: string, func: any) => (event: any) => {
    if (event.code === 'Enter' && testActiveElementById(id)) {
      func();
    }
  };

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <div className="flex justify-between items-center -mb-2">
        <h1 className="text-xl font-bold">Join or create a room</h1>
        <button type="button" className="h-8 w-8 p-1 hover:text-accent-400 hover:brightness-[1.2]" title="Need some help ?" onClick={() => setShowHelp(!showHelp)}>
          <QuestionMarkCircleIcon />
        </button>
      </div>

      <div className={`absolute right-0 top-3 font-medium bg-background-600 text-foreground p-3 rounded-r-lg w-[44ch] whitespace-normal translate-x-[100%] ${visibility(showHelp)}`}>
        <h1 className="font-black text-xl">Basics</h1>
        <p className="font-bold">
          The person wanting to share the film need to create the room
          which will create an ID under the room name.
          This ID the what you give for others to join the room.
        </p>
        <br />
        <h1 className="font-bold text-xl text-foreground/90">Create a room</h1>
        <p className="text-foreground/70">
          A room can be public or private,
          shown by the state of the lock when creating a room, open by default.
          If a room is private, you will be prompted for every connection and
          can accept or reject them.
        </p>
        <br />
        <h1 className="font-bold text-xl text-foreground/90">Join a room</h1>
        <p className="text-foreground/70">
          Simply put the ID the owner will give you in the input field.
          If the room you try to join is private, just wait until the owner accepts you.
        </p>
      </div>

      <div className="flex space-x-1">
        <Input noHelper id="join" className="rounded-r-none" placeholder="Room ID" onKeyPress={(event: any) => handleKeyPressInput('join', joinRoomHandler(event))} value={joinInput} setValue={setJoinInput} />
        <Button className="rounded-l-none w-24 px-1" text="Join" onClick={(event: React.ChangeEvent<HTMLInputElement>) => joinRoomHandler(event)} disabled={!(R.length(joinInput) === 40)} />
      </div>

      <div className="flex space-x-1">
        <Input id="create" className="rounded-r-none" placeholder="Room name" onKeyPress={handleKeyPressInput('create', newRoomHandler)} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onRoomInputChange(event, room, setRoom)} value={createInput} setValue={setCreateInput} />
        <LockToggle toggle={isPrivate} onClick={handleClick} onKeyPress={handleKeyPress} />
        <Button colorless className="rounded-l-none w-28 px-1" text="Create" onClick={newRoomHandler} disabled={!isValid(createInput)} />
      </div>
    </div>
  );
};

export default RoomInputGroup;
