import React from 'react';
import Videojs from '../components/Videojs';
import OverlayMenu from '../components/OverlayMenu';
import Panel from '../components/Panel';
import useSideMenu from '../hooks/sideMenu';
import useConnection from '../hooks/connection';
import useRoom from '../hooks/room';
import useUsers from '../hooks/users';
import useHelp from '../hooks/help';
import RoomInputGroup from '../components/RoomInputGroup';
import Help from '../components/Help';
import RoomDisplay from '../components/RoomDisplay';
import Userlist from '../components/Userlist';
import UserDisplay from '../components/UserDisplay';
import Chat from '../components/Chat';
import useJoinRequests from '../hooks/joinRequests';
import JoinRequestModal from '../components/JoinRequestModal';
import ChangeUsernameModal from '../components/ChangeUsernameModal';

const Home = ({
  connection,
  users,
  room,
  joinRequests,
}: {
  connection: ReturnType<typeof useConnection>,
  users: ReturnType<typeof useUsers>,
  room: ReturnType<typeof useRoom>,
  joinRequests: ReturnType<typeof useJoinRequests>,
}) => {
  /**
   * State of the visibility of the panel, help, chat and modal.
   */
  const panel = useSideMenu(true);
  const chat = useSideMenu(false);
  const help = useHelp(false);

  const roomNotEmpty = room.current.name !== '' && room.current.id !== '';
  const emptyUserList = users.get.length <= 0;

  return (
    <>
      <ChangeUsernameModal users={users} className="pt-9" />

      <JoinRequestModal joinRequests={joinRequests} />

      <div className="h-screen w-screen truncate flex">
        <Panel state={panel}>
          <RoomInputGroup
            connection={connection}
            room={room}
            visible={!roomNotEmpty}
            help={help}
          />

          <Help visible={help.isOpen} />

          <RoomDisplay
            room={room}
            connection={connection}
            visible={roomNotEmpty}
          />

          <Userlist
            users={users}
            room={room}
            visible={!emptyUserList}
          />

          <UserDisplay users={users} />
        </Panel>

        <Chat state={chat}>
          <p>Ceci est un chat</p>
        </Chat>

        {/* Video */}
        <div className="relative w-[-webkit-fill-available] h-screen flex items-center justify-center">
          {/* Player */}
          <div className="video-max-width mx-auto w-[inherit]">
            <Videojs
              options={{}}
              onReady={() => { }}
            />
          </div>

          {/* Menus */}
          <OverlayMenu panel={panel} chat={chat} />
        </div>
      </div>
    </>
  );
};

export default Home;
