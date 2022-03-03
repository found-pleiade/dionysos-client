import React, { useRef } from 'react';
import * as R from 'ramda';
import { window as tauriWindow } from '@tauri-apps/api';
import Id from '../components/Id';
import Userlist from '../components/Userlist';
import Videojs from '../components/Videojs';
import { sendFunction } from '../constants';
import { requestData, visibility } from '../utils';
import Separator from '../components/Separator';
import RoomInput from '../components/RoomInput';
import { User } from '../utils/types';

const newRoom = (
  send: sendFunction,
  room: string,
  username: string,
  isPrivate: boolean,
  setRoom: React.Dispatch<React.SetStateAction<string>>,
) => {
  setRoom(room);
  send(requestData('NRO', { roomname: room, ownername: username, isPrivate }));
};

const joinRoom = (
  send: sendFunction,
  username: string,
  roomidEl: HTMLInputElement,
) => {
  send(requestData('JRO', { requesterUsername: username, roomid: roomidEl.value }));
};

const onRoomInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setRoom: React.Dispatch<React.SetStateAction<string>>,
) => setRoom(event.target.value);

type homeProps = {
  username: string,
  userid: string,
  users: Array<User>,
  room: string,
  setRoom: React.Dispatch<React.SetStateAction<string>>,
  roomid: string,
  send: sendFunction,
}

const Home = ({
  username, userid, users, room, setRoom, roomid, send,
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

  const roomNotEmpty = room !== '' && roomid !== '';
  const emptyUserList = users.length <= 0;

  document.querySelector('.vjs-fullscreen-control')?.addEventListener('click', async (event) => {
    const current = tauriWindow.getCurrent();
    current.setFullscreen(!(await current.isFullscreen()));
  });

  return (
    <div className="h-screen w-screen truncate bg-black flex">
      <div className="flex flex-col justify-between p-3 bg-neutral-900">
        <div className={`flex flex-col gap-3 ${visibility(!roomNotEmpty)}`}>
          <RoomInput text="Create" placeholder="Enter a room name" onClick={() => newRoom(send, room, username, false, setRoom)} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onRoomInputChange(event, setRoom)} buttonClassName="bg-neutral-600 focus:bg-neutral-500 hover:bg-neutral-500" />

          <RoomInput text="Join" placeholder="Enter a room ID" onClick={(event: React.ChangeEvent<HTMLInputElement>) => joinRoom(send, username, event.target.parentElement?.firstElementChild as HTMLInputElement)} buttonClassName="bg-vin-600 focus:bg-vin-500 hover:bg-vin-500" />
        </div>

        <div className={visibility(roomNotEmpty)}>
          <h1 className="text-2xl font-medium">{room}</h1>
          <Id userid={roomid} />
        </div>

        <Separator className={visibility(roomNotEmpty || !emptyUserList)} />

        <Userlist users={users} className={visibility(!emptyUserList)} />

        <Separator className={visibility(!emptyUserList)} />

        <div>
          <p className="text-md">{username}</p>
          <Id userid={userid} />
        </div>
      </div>

      <Videojs
        options={videoJsOptions}
        onReady={handlePlayerReady}
      />
    </div>
  );
};

export default Home;
