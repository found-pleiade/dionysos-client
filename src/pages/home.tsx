import React, { useContext, useEffect, useState } from "react";
import OverlayMenu from "../components/home/OverlayMenu";
import Panel from "../components/home/Panel";
import useSideMenu from "../states/sideMenu";
import UserDisplay from "../components/home/UserDisplay";
import { ShareContext } from "../features/shareRoom";
import useJoinRoom from "../states/room/joinRoom";
import useDisconnectUser from "../states/room/disconnectUser";
import useCreateRoom from "../states/room/createRoom";
import Button from "../components/Button";
import { ShareIcon } from "@heroicons/react/solid";
import SpaceBetween from "../layouts/SpaceBetween";
import { SettingsContext } from "../states/settings";
import { AuthContext } from "../features/auth";
import { UserContext } from "../states/user";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import SimpleDialog from "../components/SimpleDialog";
import { SettingsContext } from "../states/settings";
import { AuthContext } from "../features/auth";
import { UserContext } from "../states/user";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const Home = () => {
  const share = useContext(ShareContext);
  useJoinRoom();
  const createRoom = useCreateRoom();

  const [sharableUrl, setSharableUrl] = useState("");

  const panel = useSideMenu(share.isJoining);
  const [isDialogOpen, setIsDialogOpen] = useState(!share.isJoining);

  const [urlCopied, setUrlCopied] = useState(false);

  useEffect(() => {
    if (!share.isJoining)
      setSharableUrl(share.createUrl(createRoom.data?.uri.split("/").pop()));
  }, [createRoom]);

  const disconnectUser = useDisconnectUser();

  window.onunload = () => {
    disconnectUser.mutate();
  };

  const url = sharableUrl || window.location.href;

  const settings = useContext(SettingsContext);
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);

  useEffect(() => {
    if (!share.id) return;

    const eventSource = async () => {
      await fetchEventSource(
        `${settings.get.server}/rooms/${share.id}/stream`,
        {
          headers: auth.newSseHeaders(user),
          async onopen(event) {
            console.log(event);
          },
          onmessage(event) {
            console.log(event);
          },
          onerror(event) {
            console.log(event);
          },
        }
      );
    };

    eventSource();
  }, [share]);

  return (
    <div className="page">
      <div className="h-screen w-screen truncate flex">
        <Panel state={panel}>
          <>
            <Button
              className="ml-auto min-w-0 w-10 h-10 px-2.5 rounded-full"
              onClick={() => {
                setIsDialogOpen(true);
              }}
            >
              <ShareIcon />
            </Button>

            <SimpleDialog
              show={isDialogOpen}
              closeFunction={() => {
                panel.setIsOpen(true);
                setIsDialogOpen(false);
              }}
              className="text-center max-w-3xl w-auto"
            >
              <p className="text-xl font-bold">
                Share the following link to your friends:
              </p>

              <Button
                headless
                className="text-lg font-mono mt-3 mb-6"
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  setUrlCopied(true);

                  setTimeout(() => {
                    setUrlCopied(false);
                  }, 3000);
                }}
              >
                <p>{url}</p>

                <p
                  className={`text-base font-medium ${
                    urlCopied
                      ? "text-light-accent-400 dark:text-dark-accent-400 opacity-100"
                      : "opacity-60"
                  }`}
                >
                  {urlCopied ? "copied!" : "click to copy"}
                </p>
              </Button>

              <SpaceBetween>
                <div />
                <Button
                  onClick={() => {
                    panel.setIsOpen(true);
                    setIsDialogOpen(false);
                  }}
                  colorless
                >
                  Done
                </Button>
              </SpaceBetween>
            </SimpleDialog>
          </>

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
