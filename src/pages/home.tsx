import React, { useRef, useState } from 'react';
import * as R from 'ramda';
import Id from '../components/Id';
import Userlist from '../components/Userlist';
import Videojs from '../components/Videojs';
import { sendFunction } from '../constants';
import { requestData } from '../utils';
import Separator from '../components/Separator';

const sendRoom = (
  isAlreadyCreated: boolean,
  send: sendFunction,
  room: string,
  username: string,
  isPrivate: boolean,
  setRoom: Function,
) => R.ifElse(
  () => isAlreadyCreated,
  () => null,
  () => {
    setRoom(room);
    send(requestData('NRO', { roomname: room, ownername: username, isPrivate }));
  },
);

type homeProps = {
  username: string,
  userid: string,
  users: Array<{ id: number, name: string }>,
  room: string,
  setRoom: Function,
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

  return (
    <div className="h-screen w-screen truncate bg-black flex">
      <div className="flex flex-col justify-between p-3 bg-neutral-900 w-[375px]">
        <button type="button" onClick={sendRoom(false, send, 'Test room', username, true, setRoom)}>Create a room</button>

        <Separator />

        <div className="">
          <h1 className="text-2xl">{room}</h1>
          <Id userid={roomid} />
        </div>

        <Separator />

        <Userlist users={users} />

        <Separator />

        <div>
          <p className="text-md text-neutral-100">{username}</p>
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
