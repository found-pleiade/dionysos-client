import React from 'react';
import Videojs from '../components/Videojs';
import OverlayMenu from '../components/OverlayMenu';
import Panel from '../components/Panel';
import useSideMenu from '../hooks/sideMenu';
import useHelp from '../hooks/help';
import Help from '../components/Help';

const Home = () => {
  /**
   * State of the visibility of the panel, help, chat and modal.
   */
  const panel = useSideMenu(true);
  const chat = useSideMenu(false);
  const help = useHelp(false);

  return (
    <div className="page">
      <div className="h-screen w-screen truncate flex">
        <Panel state={panel}>
          <Help visible={help.isOpen} />
        </Panel>

        {/* Video */}
        <div className="relative w-[-webkit-fill-available] h-screen flex items-center justify-center">
          {/* Player */}
          <div className="video-max-width mx-auto w-[inherit]">
            <Videojs
              options={{}}
              onReady={() => { }}
            />
          </div>

          {/* Menus */}
          <OverlayMenu panel={panel} chat={chat} />
        </div>
      </div>
    </div>
  );
};

export default Home;
