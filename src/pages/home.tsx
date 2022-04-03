import React, { useRef, useState } from 'react';
import Userlist from '../components/Userlist';
import Videojs from '../components/Videojs';
import { translate, visibility } from '../utils';
import Separator from '../components/Separator';
import {
  Room, User, SetRoom, SetUser, JoinRequest,
} from '../utils/types';
import OverlayMenu from '../components/OverlayMenu';
import UserDisplay from '../components/UserDisplay';
import RoomDisplay from '../components/RoomDisplay';
import MinimizeIcon from '../components/MinimizeIcon';
import RoomInputGroup from '../components/RoomInputGroup';
import useModal, { ModalType } from '../hooks/modal';
import ChangeNameModal from '../components/ChangeNameModal';
import Help from '../components/Help';
import JoinRequestModal from '../components/JoinRequestModal';
import { Connection } from '../hooks/connection';

type homeProps = {
  connection: Connection,
  user: User,
  setUser: SetUser,
  users: Array<User>,
  room: Room,
  setRoom: SetRoom,
  joinRequestModal: ModalType,
  joinRequests: Array<JoinRequest>,
  setJoinRequests: React.Dispatch<React.SetStateAction<Array<JoinRequest>>>,
}

const Home = ({
  connection,
  user,
  setUser,
  users,
  room,
  setRoom,
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

  const roomNotEmpty = room.name !== '' && room.id !== '';
  const emptyUserList = users.length <= 0;

  /**
   * State of the visibility of the panel, help, chat and modal.
   */
  const [panel, setPanel] = useState(true);
  const [help, setHelp] = useState(false);
  const [chat, setChat] = useState(false);
  const changeNameModal = useModal();

  return (
    <div className="h-screen w-screen truncate bg-black flex">
      {/* Panel */}
      <div className={`flex flex-col justify-between bg-background-800 relative transition-all py-3 ${translate(panel)}`}>
        <MinimizeIcon func={setPanel} />
        <RoomInputGroup
          send={connection.send}
          room={room}
          setRoom={setRoom}
          className={`${visibility(!roomNotEmpty)}`}
          help={help}
          setHelp={setHelp}
        />
        <Help shown={help} />
        <RoomDisplay room={room} className={visibility(roomNotEmpty)} send={connection.send} />
        <JoinRequestModal
          modal={joinRequestModal}
          room={room}
          requests={joinRequests}
          setRequests={setJoinRequests}
          send={connection.send}
        />
        <Separator className={visibility(!emptyUserList)} />
        <Userlist users={users} room={room} className={visibility(!emptyUserList)} />
        <Separator className={visibility(!emptyUserList)} />
        <UserDisplay user={user} modal={changeNameModal} />
        <ChangeNameModal
          modal={changeNameModal}
          user={user}
          setUser={setUser}
          send={connection.send}
        />
      </div>

      {/* Chat */}
      <div className={`flex flex-col justify-between bg-background-700 relative transition-all py-3 ${translate(chat)}`}>
        <MinimizeIcon func={setChat} />
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
        <OverlayMenu panel={panel} setPanel={setPanel} chat={chat} setChat={setChat} />
      </div>
    </div>
  );
};

export default Home;
