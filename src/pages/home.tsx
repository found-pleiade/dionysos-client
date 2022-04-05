import React, { useRef } from 'react';
import Videojs from '../components/Videojs';
import { JoinRequest } from '../utils/types';
import OverlayMenu from '../components/OverlayMenu';
import Panel from '../components/Panel';
import useSideMenu from '../hooks/sideMenu';
import useConnection from '../hooks/connection';
import useModal from '../hooks/modal';
import useRoom from '../hooks/room';
import useUsers from '../hooks/users';
import useHelp from '../hooks/help';
import RoomInputGroup from '../components/RoomInputGroup';
import Help from '../components/Help';
import RoomDisplay from '../components/RoomDisplay';
import JoinRequestModal from '../components/JoinRequestModal';
import Userlist from '../components/Userlist';
import UserDisplay from '../components/UserDisplay';
import ChangeNameModal from '../components/ChangeNameModal';
import Chat from '../components/Chat';

type homeProps = {
  connection: ReturnType<typeof useConnection>,
  users: ReturnType<typeof useUsers>,
  room: ReturnType<typeof useRoom>,
  joinRequestModal: ReturnType<typeof useModal>,
  joinRequests: Array<JoinRequest>,
  setJoinRequests: React.Dispatch<React.SetStateAction<Array<JoinRequest>>>,
}

const Home = ({
  connection,
  users,
  room,
  joinRequestModal,
  joinRequests,
  setJoinRequests,
}: homeProps) => {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    fullscreen: true,
    fluid: true,
    techOrder: ['youtube'],
    sources: [{
      src: 'https://www.youtube.com/watch?v=_VjPDGdUIDI',
      type: 'video/youtube',
    }],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // you can handle player events here
    player.on('waiting', () => {
      // console.log('player is waiting');
    });

    player.on('dispose', () => {
      // console.log('player will dispose');
    });
  };

  /**
   * State of the visibility of the panel, help, chat and modal.
   */
  const panel = useSideMenu(true);
  const chat = useSideMenu(false);
  const help = useHelp(false);
  const changeNameModal = useModal();

  const roomNotEmpty = room.current.name !== '' && room.current.id !== '';
  const emptyUserList = users.get.length <= 0;

  return (
    <>
      <JoinRequestModal
        connection={connection}
        modal={joinRequestModal}
        room={room}
        requests={joinRequests}
        setRequests={setJoinRequests}
      />

      <ChangeNameModal
        modal={changeNameModal}
        users={users}
        connection={connection}
      />

      <div className="h-screen w-screen truncate bg-black flex">
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

          <UserDisplay users={users} modal={changeNameModal} />
        </Panel>

        <Chat state={chat}>
          <p>Ceci est un chat</p>
        </Chat>

        {/* Video */}
        <div className="relative w-[-webkit-fill-available] h-screen flex items-center justify-center">
          {/* Player */}
          <div className="video-max-width mx-auto w-[inherit]">
            <Videojs
              options={videoJsOptions}
              onReady={handlePlayerReady}
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
