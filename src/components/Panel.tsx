import React from 'react';
import useConnection from '../hooks/connection';
import useHelp from '../hooks/help';
import useModal from '../hooks/modal';
import useRoom from '../hooks/room';
import useSideMenu from '../hooks/sideMenu';
import useUsers from '../hooks/users';
import { translate, visibility } from '../utils';
import { JoinRequest } from '../utils/types';
import ChangeNameModal from './ChangeNameModal';
import Help from './Help';
import JoinRequestModal from './JoinRequestModal';
import MinimizeIcon from './MinimizeIcon';
import RoomDisplay from './RoomDisplay';
import RoomInputGroup from './RoomInputGroup';
import Separator from './Separator';
import UserDisplay from './UserDisplay';
import Userlist from './Userlist';

const Panel = ({
  connection,
  room,
  users,
  panel,
  joinRequests,
  setJoinRequests,
  joinRequestModal,
}: {
  connection: ReturnType<typeof useConnection>,
  room: ReturnType<typeof useRoom>,
  users: ReturnType<typeof useUsers>,
  panel: ReturnType<typeof useSideMenu>,
  joinRequests: Array<JoinRequest>,
  setJoinRequests: React.Dispatch<React.SetStateAction<Array<JoinRequest>>>,
  joinRequestModal: ReturnType<typeof useModal>,
}) => {
  const help = useHelp(false);
  const changeNameModal = useModal();

  const roomNotEmpty = room.current.name !== '' && room.current.id !== '';
  const emptyUserList = users.get.length <= 0;

  return (
    <div className={`flex flex-col justify-between bg-background-800 relative transition-all py-3 ${translate(panel.isOpen)}`}>
      <MinimizeIcon func={panel.toggle} />
      <RoomInputGroup
        connection={connection}
        room={room}
        className={`${visibility(!roomNotEmpty)}`}
        help={help}
      />
      <Help shown={help.isOpen} />
      <RoomDisplay room={room} className={visibility(roomNotEmpty)} connection={connection} />
      <JoinRequestModal
        connection={connection}
        modal={joinRequestModal}
        room={room}
        requests={joinRequests}
        setRequests={setJoinRequests}
      />
      <Separator className={visibility(!emptyUserList)} />
      <Userlist users={users} room={room} className={visibility(!emptyUserList)} />
      <Separator className={visibility(!emptyUserList)} />
      <UserDisplay users={users} modal={changeNameModal} />
      <ChangeNameModal
        modal={changeNameModal}
        users={users}
        connection={connection}
      />
    </div>
  );
};

export default Panel;
