import React, { useRef, useState } from 'react';
import * as R from 'ramda';
import { window as tauriWindow } from '@tauri-apps/api';
import {
  PencilAltIcon, ChevronLeftIcon, ChatAltIcon, MenuIcon,
} from '@heroicons/react/solid';
import Id from '../components/Id';
import Userlist from '../components/Userlist';
import Videojs from '../components/Videojs';
import { requestData, visibility } from '../utils';
import Separator from '../components/Separator';
import RoomInput from '../components/RoomInput';
import {
  Room, User, sendFunction, SetRoom,
} from '../utils/types';
import { codes } from '../constants';

const newRoom = (
  send: sendFunction,
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
  send: sendFunction,
  user: User,
  roomidEl: HTMLInputElement,
) => {
  send(requestData(
    codes.request.joinRoom,
    { salt: user.salt, roomid: roomidEl.value },
  ));
};

const changeUsername = (
  send: sendFunction,
  user: User,
  newUserName: string,
) => {
  send(requestData(
    codes.request.changeUserName,
    { newUserName, salt: user.salt },
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
  send: sendFunction,
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
  const translate = (condition: boolean) => (condition ? 'max-w-[650px] px-3 overflow-visible' : 'max-w-0 px-0 overflow-hidden');

  // document.querySelector('.vjs-fullscreen-control')?.addEventListener('click', async (event) => {
  //   const current = tauriWindow.getCurrent();
  //   if (R.not(R.isNil(current))) current.setFullscreen(!(await current.isFullscreen()));
  // });

  return (
    <div className="h-screen w-screen truncate bg-black flex">
      {/* Panel */}
      <div className={`flex flex-col justify-between bg-neutral-900 relative transition-all py-3 ${translate(panel)}`}>
        <ChevronLeftIcon className="block absolute top-[50%] right-3 z-10 p-1 h-8 w-8 bg-neutral-700 rounded-full cursor-pointer text-center translate-y-[-50%]" onClick={() => setPanel(false)} />

        <div className={`flex flex-col gap-3 ${visibility(!roomNotEmpty)}`}>
          <RoomInput text="Create" placeholder="Enter a room name" onClick={() => newRoom(send, user, room, setRoom, false)} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onRoomInputChange(event, room, setRoom)} buttonClassName="bg-neutral-600 focus:bg-neutral-500 hover:bg-neutral-500" />

          <RoomInput text="Join" placeholder="Enter a room ID" onClick={(event: React.ChangeEvent<HTMLInputElement>) => joinRoom(send, user, event.target.parentElement?.firstElementChild as HTMLInputElement)} buttonClassName="bg-vin-600 focus:bg-vin-500 hover:bg-vin-500" />
        </div>

        <div className={visibility(roomNotEmpty)}>
          <h1 className="text-2xl font-medium">{room.name}</h1>
          <Id id={room.id} />
        </div>

        <Separator className={visibility(roomNotEmpty || !emptyUserList)} />

        <Userlist users={users} className={visibility(!emptyUserList)} />

        <Separator className={visibility(!emptyUserList)} />

        <div>
          <button className="text-md flex items-center" onClick={() => changeUsername(send, user, 'Michel')} type="button">
            {user.name}
            {' '}
            <PencilAltIcon className="ml-2 h-5 w-4" />
          </button>
          <Id id={user.id} />
        </div>
      </div>

      {/* Chat */}
      <div className={`w-[500px] flex flex-col justify-between bg-neutral-800 relative transition-all py-3 ${translate(chat)}`}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>

        <ChevronLeftIcon className="block absolute top-[50%] right-3 z-10 p-1 h-8 w-8 bg-neutral-700 rounded-full cursor-pointer text-center translate-y-[-50%]" onClick={() => setChat(false)} />
      </div>

      {/* Video */}
      <div className="relative">
        {/* Menus */}
        <div className="absolute top-[50%] left-3 z-10 space-y-3 translate-y-[-50%]">
          <MenuIcon className={`block p-2 h-8 w-8 bg-neutral-700 rounded-full cursor-pointer text-center opacity-60 hover:opacity-100 transition-opacity ${visibility(!panel)}`} onClick={() => setPanel(true)} />

          <ChatAltIcon className={`block p-2 h-8 w-8 bg-neutral-700 rounded-full cursor-pointer text-center opacity-60 hover:opacity-100 transition-opacity ${visibility(!chat)}`} onClick={() => setChat(true)} />
        </div>

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
