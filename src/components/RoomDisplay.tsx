import { LogoutIcon } from '@heroicons/react/solid';
import React from 'react';
import { codes } from '../constants';
import { requestData } from '../utils';
import { Room, SendFunction, User } from '../utils/types';
import Id from './Id';

const quitRoom = (
  send: SendFunction,
  user: User,
) => send(requestData(
  codes.request.quitRoom,
  { username: user.name },
));

type RoomDisplayProps = { room: Room, className?: string, send: SendFunction, user: User };

const RoomDisplay = ({
  room, className, send, user,
}: RoomDisplayProps) => (
  <div className={className}>
    <h1 className="text-2xl font-black mb-4">{room.name}</h1>
    <LogoutIcon className="h-11 w-11 p-3 absolute right-0 top-0 bg-background-500 hover:bg-background-400 rounded-bl-lg cursor-pointer transition-colors" onClick={() => quitRoom(send, user)} tabIndex={0} onKeyPress={(event) => { if (event.code === 'Enter') quitRoom(send, user); }} />
    <Id id={room.id} />
  </div>
);

export default RoomDisplay;
