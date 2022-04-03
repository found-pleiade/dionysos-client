import React from 'react';
import { codes } from '../constants';
import useConnection from '../hooks/connection';
import useRoom from '../hooks/room';
import { requestData } from '../utils';
import Id from './Id';

const quitRoom = (
  connection: ReturnType<typeof useConnection>,
) => connection.send(requestData(
  codes.request.quitRoom,
  {},
));

type RoomDisplayProps = {
  room: ReturnType<typeof useRoom>,
  className?: string,
  connection: ReturnType<typeof useConnection>,
};

/**
 * Display the room name, it's id and the leave button.
 */
const RoomDisplay = ({
  room,
  className,
  connection,
}: RoomDisplayProps) => (
  <div className={className}>
    <h1 className="text-2xl font-black mb-4 pt-1">{room.current.name}</h1>
    <div role="button" className="px-4 py-2 absolute right-0 top-3 bg-background-500 hover:bg-background-400 rounded-l-lg cursor-pointer transition-colors font-medium" title="Leave the current room" tabIndex={0} onClick={() => quitRoom(connection)} onKeyPress={(event) => { if (event.code === 'Enter') quitRoom(connection); }}>
      Leave
    </div>
    <Id id={room.current.id} copy />
  </div>
);

export default RoomDisplay;
