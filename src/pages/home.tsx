import React, { useRef, useState } from 'react';
import Id from '../components/Id';
import Userlist from '../components/Userlist';
import Videojs from '../components/Videojs';

type homeProps = {
  username: string,
  userid: string,
  users: Array<string>,
  room: string,
  roomid: string,
}

const Home = ({
  username, userid, users, room, roomid,
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
        <div className="mb-20">
          <h1 className="text-2xl">{room}</h1>
          <Id userid={roomid} />
        </div>

        <Userlist users={users} />

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
