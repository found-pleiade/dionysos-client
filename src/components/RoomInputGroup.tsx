import React from 'react';
import { codes } from '../constants';
import { requestData } from '../utils';
import {
  Room, SendFunction, SetRoom, User,
} from '../utils/types';
import RoomInput from './RoomInput';

const newRoom = (
  send: SendFunction,
  user: User,
  room: Room,
  setRoom: SetRoom,
  isPrivate: boolean,
) => {
  setRoom(room);
  send(requestData(
    codes.request.roomCreation,
    { roomname: room.name, salt: user.salt, isPrivate },
  ));
};

const joinRoom = (
  send: SendFunction,
  user: User,
  roomidEl: HTMLInputElement,
) => {
  send(requestData(
    codes.request.joinRoom,
    { salt: user.salt, roomid: roomidEl.value },
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
  user: User,
  room: Room,
  setRoom: SetRoom,
  className: string,
}

const RoomInputGroup = ({
  send, user, room, setRoom, className,
}: RoomInputGroupProps) => (
  <div className={`flex flex-col gap-3 ${className}`}>
    <RoomInput text="Create" colorless placeholder="Enter a room name" onClick={() => newRoom(send, user, room, setRoom, false)} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onRoomInputChange(event, room, setRoom)} />

    <RoomInput text="Join" placeholder="Enter a room ID" onClick={(event: React.ChangeEvent<HTMLInputElement>) => joinRoom(send, user, event.target.parentElement?.firstElementChild as HTMLInputElement)} />
  </div>
);

export default RoomInputGroup;
