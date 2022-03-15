import React, { useRef, useState } from 'react';
import * as R from 'ramda';
import { window as tauriWindow } from '@tauri-apps/api';
import Userlist from '../components/Userlist';
import Videojs from '../components/Videojs';
import { requestData, translate, visibility } from '../utils';
import Separator from '../components/Separator';
import RoomInput from '../components/RoomInput';
import {
  Room, User, SendFunction, SetRoom,
} from '../utils/types';
import { codes } from '../constants';
import OverlayMenu from '../components/OverlayMenu';
import UserDisplay from '../components/UserDisplay';
import RoomDisplay from '../components/RoomDisplay';
import MinimizeIcon from '../components/MinimizeIcon';

const newRoom = (
  send: SendFunction,
  user: User,
  room: Room,
  setRoom: SetRoom,
  isPrivate: boolean,
) => {
  setRoom(room);
  send(requestData(
    codes.request.roomCreation,
    { roomname: room.name, salt: user.salt, isPrivate },
  ));
};

const joinRoom = (
  send: SendFunction,
  user: User,
  roomidEl: HTMLInputElement,
) => {
  send(requestData(
    codes.request.joinRoom,
    { salt: user.salt, roomid: roomidEl.value },
  ));
};

const onRoomInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  room: Room,
  setRoom: SetRoom,
) => setRoom({ ...room, name: event.target.value });

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

        <div className={`flex flex-col gap-3 ${visibility(!roomNotEmpty)}`}>
          <RoomInput text="Create" placeholder="Enter a room name" onClick={() => newRoom(send, user, room, setRoom, false)} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onRoomInputChange(event, room, setRoom)} buttonClassName="bg-neutral-600 focus:bg-neutral-500 hover:bg-neutral-500" />

          <RoomInput text="Join" placeholder="Enter a room ID" onClick={(event: React.ChangeEvent<HTMLInputElement>) => joinRoom(send, user, event.target.parentElement?.firstElementChild as HTMLInputElement)} buttonClassName="bg-vin-600 focus:bg-vin-500 hover:bg-vin-500" />
        </div>

        <RoomDisplay room={room} />
        <Separator className={visibility(roomNotEmpty || !emptyUserList)} />
        <Userlist users={users} className={visibility(!emptyUserList)} />
        <Separator className={visibility(!emptyUserList)} />
        <UserDisplay user={user} send={send} />
      </div>

      {/* Chat */}
      <div className={`w-[500px] flex flex-col justify-between bg-neutral-800 relative transition-all py-3 ${translate(chat)}`}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>

        <MinimizeIcon func={setChat} />
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
