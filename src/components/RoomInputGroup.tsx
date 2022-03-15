import React from 'react';
import { codes } from '../constants';
import { requestData, visibility } from '../utils';
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
) => setRoom({ ...room, name: event.target.value });

type RoomInputGroupProps = {
  send: SendFunction,
  user: User,
  room: Room,
  setRoom: SetRoom
}

const RoomInputGroup = ({
  send, user, room, setRoom,
}: RoomInputGroupProps) => (
  <div className={`flex flex-col gap-3 ${visibility(!(room.name !== '' && room.id !== ''))}`}>
    <RoomInput text="Create" placeholder="Enter a room name" onClick={() => newRoom(send, user, room, setRoom, false)} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onRoomInputChange(event, room, setRoom)} buttonClassName="bg-neutral-600 focus:bg-neutral-500 hover:bg-neutral-500" />

    <RoomInput text="Join" placeholder="Enter a room ID" onClick={(event: React.ChangeEvent<HTMLInputElement>) => joinRoom(send, user, event.target.parentElement?.firstElementChild as HTMLInputElement)} buttonClassName="bg-vin-600 focus:bg-vin-500 hover:bg-vin-500" />
  </div>
);

export default RoomInputGroup;
