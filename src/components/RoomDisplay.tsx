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
    <h1 className="text-2xl font-black mb-3 mt-3">{room.name}</h1>
    <div role="button" className="h-11 w-11 p-3 absolute right-0 top-3 bg-background-500 hover:bg-background-400 rounded-l-lg cursor-pointer transition-colors" title="Quit the room" tabIndex={0} onClick={() => quitRoom(send, user)} onKeyPress={(event) => { if (event.code === 'Enter') quitRoom(send, user); }}>
      <LogoutIcon />
    </div>
    <Id id={room.id} copy />
  </div>
);

export default RoomDisplay;
