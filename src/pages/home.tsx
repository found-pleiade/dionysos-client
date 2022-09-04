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
import SimpleDialog from "../components/SimpleDialog";
import useGetRoom from "../states/room/getRoom";
import { useQueryClient } from "react-query";

const Home = () => {
  const queryClient = useQueryClient();
  const share = useContext(ShareContext);
  const settings = useContext(SettingsContext);

  const createRoom = useCreateRoom();
  const joinRoom = useJoinRoom(share.id);
  const getRoom = useGetRoom(share.id);
  const disconnectUser = useDisconnectUser(share.id);

  const [url, setUrl] = useState(window.location.href);
  const [urlCopied, setUrlCopied] = useState(false);

  const panel = useSideMenu(share.isJoining);
  const [isDialogOpen, setIsDialogOpen] = useState(!share.isJoining);

  useEffect(() => {
    share.isJoining ? joinRoom.refetch() : createRoom.refetch();
  }, []);

  // Create the url to share. Only needed as a room
  // creator, users joining can just use their own url.
  // This step create the share.id for user creating a room.
  useEffect(() => {
    if (share.isJoining) return;
    setUrl(share.createUrl(createRoom.data?.uri.split("/").pop()));
  }, [createRoom.data]);

  // Get the room when possible.
  // While users joining will have the room id already set,
  // users creating a room need to wait for the server response.
  useEffect(() => {
    if (!share.id) return;
    getRoom.refetch();
  }, [share.id]);

  // Try to notify the server a user is leaving,
  // but it's not reliable and subject to change.
  useEffect(() => {
    window.onunload = () => {
      disconnectUser.mutate();
    };

    () => {
      window.onunload = null;
    };
  }, []);

  // Handle SSE events, the query gettings users
  // gets invalidated on server event, as it
  // means a user joined or left the room.
  useEffect(() => {
    if (!share.id) return;

    const source = new EventSource(
      `${settings.get.server}/rooms/${share.id}/stream`
    );

    source.onopen = (event: any) => {
      console.log(event);
    };

    source.onmessage = () => {
      queryClient.invalidateQueries(["getRoom"]);
    };
  }, [share.id]);

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

          <ul>
            {getRoom.data?.users.map((user: any) => {
              return <li key={user.ID}>{user.name}</li>;
            })}
          </ul>

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
