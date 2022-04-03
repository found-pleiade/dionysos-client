import React, { useRef } from 'react';
import Videojs from '../components/Videojs';
import { translate } from '../utils';
import { JoinRequest } from '../utils/types';
import OverlayMenu from '../components/OverlayMenu';
import MinimizeIcon from '../components/MinimizeIcon';
import Panel from '../components/Panel';
import useSideMenu from '../hooks/sideMenu';
import useConnection from '../hooks/connection';
import useModal from '../hooks/modal';
import useRoom from '../hooks/room';
import useUsers from '../hooks/users';

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

  return (
    <div className="h-screen w-screen truncate bg-black flex">
      {/* Panel */}
      <Panel
        connection={connection}
        room={room}
        users={users}
        panel={panel}
        joinRequests={joinRequests}
        setJoinRequests={setJoinRequests}
        joinRequestModal={joinRequestModal}
      />

      {/* Chat */}
      <div className={`flex flex-col justify-between bg-background-700 relative transition-all py-3 ${translate(chat.isOpen)}`}>
        <MinimizeIcon func={chat.toggle} />
        <p>Ceci est un chat</p>
      </div>

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
  );
};

export default Home;
