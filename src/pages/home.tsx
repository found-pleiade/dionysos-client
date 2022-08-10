import React, { Fragment, useContext, useEffect, useState } from "react";
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
import { Dialog, Transition } from "@headlessui/react";

const Home = () => {
  const share = useContext(ShareContext);
  const joinRoom = useJoinRoom(share.id);
  const createRoom = useCreateRoom();

  const [sharableUrl, setSharableUrl] = useState("");

  const panel = useSideMenu(share.isJoining);
  const [isOpen, setIsOpen] = useState(!share.isJoining);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (share.isJoining) {
      joinRoom.mutate();
    } else {
      createRoom.mutate();
    }
  }, []);

  useEffect(() => {
    if (!share.isJoining) setSharableUrl(share.createUrl(createRoom.data?.uri.split("/").pop()));
  }, [createRoom]);

  const disconnectUser = useDisconnectUser();

  window.onunload = () => {
    disconnectUser.mutate();
  };

  return (
    <div className="page">
      <div className="h-screen w-screen truncate flex">
        <Panel state={panel}>
          <>
            <Button
              className="ml-auto min-w-0 w-10 h-10 px-2.5 rounded-full"
              onClick={openModal}
            >
              <ShareIcon />
            </Button>

            <Transition show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => {
                  panel.setIsOpen(true);
                  closeModal();
                }}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave={`ease-in duration-200`}
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave={`ease-in duration-200`}
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="transform overflow-hidden rounded-2xl p-6 text-center align-middle shadow-xl transition-all bg-light-primary-100  dark:bg-dark-primary-700 dark:text-dark-secondary">
                        <p className="text-xl font-bold">
                          Share the following link to your friends:
                        </p>

                        <br />

                        <Button
                          headless
                          className="text-lg font-mono"
                          onClick={() => {
                            navigator.clipboard.writeText(sharableUrl);
                          }}
                        >
                          {sharableUrl || window.location.href}
                        </Button>

                        <p className="text-base font-medium opacity-60">
                          click to copy
                        </p>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
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
