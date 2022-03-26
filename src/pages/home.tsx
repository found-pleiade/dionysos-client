import React, { useRef, useState } from 'react';
import Userlist from '../components/Userlist';
import Videojs from '../components/Videojs';
import { translate, visibility } from '../utils';
import Separator from '../components/Separator';
import {
  Room, User, SendFunction, SetRoom, SetUser,
} from '../utils/types';
import OverlayMenu from '../components/OverlayMenu';
import UserDisplay from '../components/UserDisplay';
import RoomDisplay from '../components/RoomDisplay';
import MinimizeIcon from '../components/MinimizeIcon';
import RoomInputGroup from '../components/RoomInputGroup';
import useModal from '../hooks/modal';
import ChangeNameModal from '../components/ChangeNameModal';

type homeProps = {
  user: User,
  setUser: SetUser,
  users: Array<User>,
  room: Room,
  setRoom: SetRoom,
  send: SendFunction,
}

const Home = ({
  user, setUser, users, room, setRoom, send,
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

  const [panel, setPanel] = useState(true);
  const [chat, setChat] = useState(false);
  const modal = useModal();

  return (
    <div className="h-screen w-screen truncate bg-black flex">
      {/* Panel */}
      <div className={`flex flex-col justify-between bg-background-800 relative transition-all py-3 ${translate(panel)}`}>
        <MinimizeIcon func={setPanel} />
        <RoomInputGroup
          send={send}
          room={room}
          setRoom={setRoom}
          className={`${visibility(!roomNotEmpty)} space-y-1 pt-4`}
        />
        <RoomDisplay room={room} className={visibility(roomNotEmpty)} send={send} user={user} />
        <Separator className={visibility(!emptyUserList)} />
        <Userlist users={users} room={room} className={visibility(!emptyUserList)} />
        <Separator className={visibility(!emptyUserList)} />
        <UserDisplay user={user} modal={modal} />
        <ChangeNameModal modal={modal} user={user} setUser={setUser} send={send} />
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
