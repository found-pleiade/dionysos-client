import React from 'react';
import OverlayMenu from '../components/home/OverlayMenu';
import Panel from '../components/home/Panel';
import useSideMenu from '../hooks/sideMenu';

const Home = () => {
  /**
   * State of the visibility of the panel, help, chat and modal.
   */
  const panel = useSideMenu(true);

  return (
    <div className="page">
      <div className="h-screen w-screen truncate flex">
        <Panel state={panel}>
          <div />
        </Panel>

        {/* Video */}
        <div className="relative w-[-webkit-fill-available] h-screen flex items-center justify-center">
          {/* Player */}
          <div className="video-max-width mx-auto w-[inherit]" />

          {/* Menus */}
          <OverlayMenu panel={panel} />
        </div>
      </div>
    </div>
  );
};

export default Home;
