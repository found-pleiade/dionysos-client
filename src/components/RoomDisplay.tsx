import React from 'react';
import { Room } from '../utils/types';
import Id from './Id';

const RoomDisplay = ({ room, className }: { room: Room, className?: string }) => (
  <div className={className}>
    <h1 className="text-2xl font-black">{room.name}</h1>
    <Id id={room.id} />
  </div>
);

export default RoomDisplay;
