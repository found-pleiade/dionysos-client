import React from 'react';
import Videojs from '../components/Videojs';

type homeProps = {
  username: string,
  userid: string
}

const Home = ({ username, userid }: homeProps) => {
  const playerRef = React.useRef(null);

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
      <div className="flex flex-col justify-between p-3 bg-neutral-900">
        <h1 className="text-2xl mb-20">Salon</h1>

        <ul className="h-full">
          <li>user</li>
          <li>user</li>
          <li>user</li>
          <li>user</li>
          <li>user</li>
        </ul>

        <div>
          <p className="text-md text-neutral-100">{username}</p>
          <button className="text-sm text-neutral-400 cursor-pointer" title="Click to copy" onClick={() => navigator.clipboard.writeText(userid)} type="button">{userid}</button>
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
