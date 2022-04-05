import React from 'react';
import { codes } from '../constants';
import useConnection from '../hooks/connection';
import useRoom from '../hooks/room';
import { requestData, visibility } from '../utils';
import Button from './Button';
import Id from './Id';
import SpaceBetween from './SpaceBetween';

const quitRoom = (
  connection: ReturnType<typeof useConnection>,
) => () => connection.send(requestData(
  codes.request.quitRoom,
  {},
));

/**
 * Display the room name, it's id and the leave button.
 */
const RoomDisplay = ({
  room,
  connection,
  visible,
}: {
  room: ReturnType<typeof useRoom>,
  connection: ReturnType<typeof useConnection>,
  visible: boolean
}) => (
  <div className={visibility(visible)}>
    <SpaceBetween>
      <h2 className="text-2xl font-black mb-4 pt-1">{room.current.name}</h2>

      <Button className="px-4 -mr-3 h-min rounded-none rounded-l-lg" title="Leave the current room" onClick={quitRoom(connection)} colorless>Leave</Button>
    </SpaceBetween>

    <Id id={room.current.id} copy />
  </div>
);

export default RoomDisplay;
