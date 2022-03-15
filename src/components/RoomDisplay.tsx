import React from 'react';
import { visibility } from '../utils';
import { Room } from '../utils/types';
import Id from './Id';

const RoomDisplay = ({ room }: { room: Room }) => (
  <div className={visibility(room.name !== '' && room.id !== '')}>
    <h1 className="text-2xl font-medium">{room.name}</h1>
    <Id id={room.id} />
  </div>
);

export default RoomDisplay;
