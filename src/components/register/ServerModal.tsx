import React, { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GlobeAltIcon, ReplyIcon } from "@heroicons/react/solid";
import Button from "../Button";
import Input from "../Input";
import SpaceBetween from "../../layouts/SpaceBetween";
import useVersion from "../../states/getVersion";
import ErrorCard from "../ErrorCard";
import {
  SettingsContext,
  ActionTypes as SettingsActionTypes,
} from "../../states/settings";
import { notNil } from "../../utils";
import RowGroup from "../../layouts/RowGroup";

const ServerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const settings = useContext(SettingsContext);
  const [serverAddress, setServerAddress] = useState(settings.get.server);
  const [serverAddressBackup, setServerAddressBackup] = useState(serverAddress);
  const { isStale, isLoading, error, data, refetch } = useVersion(false);

  const exitModal = () => {
    if (data) setServerAddress(serverAddressBackup);
    closeModal();
  };

  const saveModalOnClick = () => {
    setServerAddressBackup(serverAddress);
    refetch();
  };

  const setInitialServerAddress = () => {
    settings.dispatch({
      type: SettingsActionTypes.SET_SERVER_DEFAULT,
      payload: {}
    });

    setServerAddress(settings.getInitial.server);
    setServerAddressBackup(settings.getInitial.server);
  }

  useEffect(() => {
    settings.dispatch({
      type: SettingsActionTypes.SET_SERVER,
      payload: { server: serverAddress },
    });
  }, [serverAddress]);

  if (data && !isStale && isOpen) {
    closeModal();
  }

  const saveButtonContent = () => {
    if (error) {
      return "Retry";
    }

    return "Save";
  };

  const leaveDelay = data && !isStale ? "delay-500" : "";

  const errorMessage = () => {
    if (error) {
      return (
        <ErrorCard>
          An error occurred while fetching the version.
          <br />
          Check your internet connection and the url.
        </ErrorCard>
      );
    }

    if (data !== "0.1.0") {
      return (
        <ErrorCard>
          Version mismatch between the client and the server api.
        </ErrorCard>
      );
    }

    return null;
  };

  return (
    <>
      <Button
        className="absolute top-0 right-0 w-10 h-10 px-2 rounded-none rounded-bl-lg"
        onClick={openModal}
      >
        <GlobeAltIcon />
      </Button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={exitModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave={`ease-in duration-200 ${leaveDelay}`}
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
                leave={`ease-in duration-200 ${leaveDelay}`}
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-light-primary-100  dark:bg-dark-primary-700 dark:text-dark-secondary">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Server address
                  </Dialog.Title>

                  <RowGroup>
                    <Button className="self-center flex-1 rounded-r-none h-10 px-5 grid place-items-center" onClick={setInitialServerAddress} title="Restore default address">
                      <ReplyIcon className="h-5" />
                    </Button>
                    
                    <Input
                      disabled={isLoading}
                      className="my-4 rounded-l-none"
                      value={serverAddress}
                      setValue={setServerAddress}
                    />
                  </RowGroup>

                  {errorMessage()}

                  <SpaceBetween>
                    <Button onClick={exitModal} colorless>
                      Back
                    </Button>

                    <Button
                      onClick={saveModalOnClick}
                      className="w-[12ch] flex items-center justify-center"
                      success={notNil(data) && !isStale}
                      loading={isLoading}
                    >
                      {saveButtonContent()}
                    </Button>
                  </SpaceBetween>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ServerModal;
