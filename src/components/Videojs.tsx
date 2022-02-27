import React from 'react';
import videojs, { VideoJsPlayer } from 'video.js';
import 'videojs-youtube/dist/Youtube.min';
import 'video.js/dist/video-js.css';

type videojsProps = {
  options: {},
  onReady: Function,
};

const Videojs = ({ options, onReady }: videojsProps) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef<VideoJsPlayer | null>(null);

  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      // eslint-disable-next-line no-multi-assign
      const player = playerRef.current = videojs(videoElement, options, () => {
        // eslint-disable-next-line no-unused-expressions
        onReady && onReady(player);
      });
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js">
        <track kind="captions" />
      </video>
    </div>
  );
};

export default Videojs;
