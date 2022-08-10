import React, { useContext, useEffect } from "react";
import OverlayMenu from "../components/home/OverlayMenu";
import Panel from "../components/home/Panel";
import useSideMenu from "../states/sideMenu";
import UserDisplay from "../components/home/UserDisplay";
import CreateRoom from "../components/home/CreateRoom";
import { ShareContext } from "../features/shareRoom";
import useJoinRoom from "../states/room/joinRoom";
import useDisconnectUser from "../states/user/disconnectUser";

const Home = () => {
  const panel = useSideMenu(true);
  const share = useContext(ShareContext);
  const joinRoom = useJoinRoom(share.id);

  useEffect(() => {
    if (share.isJoining) joinRoom.mutate();
  }, []);

  const disconnectUser = useDisconnectUser();

  window.onunload = () => {
    disconnectUser.mutate();
  };

  return (
    <div className="page">
      <div className="h-screen w-screen truncate flex">
        <Panel state={panel}>
          <CreateRoom />

          <UserDisplay />
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
