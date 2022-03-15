import React, { useRef, useState } from 'react';
import * as R from 'ramda';
import { window as tauriWindow } from '@tauri-apps/api';
import Userlist from '../components/Userlist';
import Videojs from '../components/Videojs';
import { translate, visibility } from '../utils';
import Separator from '../components/Separator';
import {
  Room, User, SendFunction, SetRoom,
} from '../utils/types';
import OverlayMenu from '../components/OverlayMenu';
import UserDisplay from '../components/UserDisplay';
import RoomDisplay from '../components/RoomDisplay';
import MinimizeIcon from '../components/MinimizeIcon';
import RoomInputGroup from '../components/RoomInputGroup';

type homeProps = {
  user: User,
  users: Array<User>,
  room: Room,
  setRoom: SetRoom,
  send: SendFunction,
}

const Home = ({
  user, users, room, setRoom, send,
}: homeProps) => {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    fullscreen: true,
    height: window.innerHeight,
    techOrder: ['youtube'],
    sources: [{
      src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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

  // document.querySelector('.vjs-fullscreen-control')?.addEventListener('click', async (event) => {
  //   const current = tauriWindow.getCurrent();
  //   if (R.not(R.isNil(current))) current.setFullscreen(!(await current.isFullscreen()));
  // });

  return (
    <div className="h-screen w-screen truncate bg-black flex">
      {/* Panel */}
      <div className={`flex flex-col justify-between bg-neutral-900 relative transition-all py-3 ${translate(panel)}`}>
        <MinimizeIcon func={setPanel} />
        <RoomInputGroup
          send={send}
          user={user}
          room={room}
          setRoom={setRoom}
          className={visibility(!roomNotEmpty)}
        />
        <RoomDisplay room={room} className={visibility(roomNotEmpty)} />
        <Separator className={visibility(!emptyUserList)} />
        <Userlist users={users} className={visibility(!emptyUserList)} />
        <Separator className={visibility(!emptyUserList)} />
        <UserDisplay user={user} send={send} />
      </div>

      {/* Chat */}
      <div className={`w-[500px] flex flex-col justify-between bg-neutral-800 relative transition-all py-3 ${translate(chat)}`}>
        <MinimizeIcon func={setChat} />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      </div>

      {/* Video */}
      <div className="relative">
        {/* Menus */}
        <OverlayMenu panel={panel} setPanel={setPanel} chat={chat} setChat={setChat} />

        {/* Player */}
        <Videojs
          options={videoJsOptions}
          onReady={handlePlayerReady}
        />
      </div>
    </div>
  );
};

export default Home;
