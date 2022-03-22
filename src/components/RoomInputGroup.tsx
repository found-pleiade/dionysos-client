import React, { useState } from 'react';
import { codes } from '../constants';
import { requestData } from '../utils';
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
  roomidEl: HTMLInputElement,
) => {
  send(requestData(
    codes.request.joinRoom,
    { roomid: roomidEl.value },
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

  const handleClick = () => setIsPrivate(!isPrivate);
  const handleKeyPress = (event: any) => { if (event.code === 'Enter') setIsPrivate(!isPrivate); };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex space-x-1">
        <Input className="rounded-r-none" placeholder="Enter a room ID" />
        <Button className="rounded-l-none w-24 px-1" text="Join" onClick={(event: React.ChangeEvent<HTMLInputElement>) => joinRoom(send, event.target.parentElement?.firstElementChild as HTMLInputElement)} />
      </div>

      <div className="flex space-x-1">
        <Input className="rounded-r-none" placeholder="Enter a room name" onChange={(event: React.ChangeEvent<HTMLInputElement>) => onRoomInputChange(event, room, setRoom)} />
        <LockToggle toggle={isPrivate} onClick={handleClick} onKeyPress={handleKeyPress} />
        <Button colorless className="rounded-l-none w-28 px-1" text="Create" onClick={() => newRoom(send, room, setRoom, isPrivate)} />
      </div>
    </div>
  );
};

export default RoomInputGroup;
