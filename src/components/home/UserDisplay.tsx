import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";
import Input from "../Input";
import SpaceBetween from "../../layouts/SpaceBetween";
import useRenameUser from "../../states/user/renameUser";
import ErrorCard from "../ErrorCard";
import { isValid, isValidConditions } from "../../utils";
import useGetUser from "../../states/user/getUser";
import { useQueryClient } from "react-query";

const UserDisplay = () => {
  // Used to invalidate getUser on renaming
  const queryClient = useQueryClient();

  // Those are values used for setTimeouts, and the close animation.
  const closeOnSuccessDelay = 500;
  const closeDuration = 200;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getUser = useGetUser();
  const renameUser = useRenameUser();
  const [username, setUsername] = useState("");

  // Use a timeout to clear errors
  // after the animation is done.
  const closeModal = () => {
    setIsDialogOpen(false);

    setTimeout(() => {
      renameUser.reset();
    }, closeDuration);
  };

  const openModal = () => {
    setUsername(getUser.data?.name);
    setIsDialogOpen(true);
  };

  // Use a timeout to clear data
  // after the animation is done.
  useEffect(() => {
    if (renameUser.isSuccess && isDialogOpen) {
      queryClient.invalidateQueries(["getUser"]);
      setIsDialogOpen(false);

      setTimeout(() => {
        renameUser.reset();
      }, closeOnSuccessDelay + closeDuration);
    }
  }, [renameUser.isSuccess]);

  // Classes based on timeouts durations
  const closeDurationClass = `duration-${closeDuration}`;
  const closeDelayClass = renameUser.isSuccess
    ? `delay-${closeOnSuccessDelay}`
    : "";

  return (
    <>
      <Button headless onClick={openModal} className="text-left">
        {getUser.data?.name}
      </Button>

      <Transition show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave={`ease-in ${closeDurationClass} ${closeDelayClass}`}
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
                leave={`ease-in ${closeDurationClass} ${closeDelayClass}`}
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-light-primary-100  dark:bg-dark-primary-700 dark:text-dark-secondary">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 mb-4"
                  >
                    Username
                  </Dialog.Title>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      renameUser.mutate(username);
                    }}
                  >
                    <Input
                      disabled={renameUser.isLoading}
                      className="mb-4"
                      value={username}
                      setValue={setUsername}
                    />

                    <ErrorCard show={!isValidConditions.gteTwo(username)}>
                      Minimum length is 2 chars
                    </ErrorCard>

                    <ErrorCard show={!isValidConditions.lteTwenty(username)}>
                      Maximum length is 20 chars
                    </ErrorCard>

                    <ErrorCard show={renameUser.error ? true : false}>
                      An error occurred while trying to rename you.
                    </ErrorCard>

                    <SpaceBetween>
                      <Button onClick={closeModal} colorless>
                        Back
                      </Button>

                      <Button
                        type="submit"
                        success={renameUser.isSuccess}
                        disabled={!isValid(username)}
                        loading={renameUser.isLoading}
                      >
                        {renameUser.error ? "Retry" : "Save"}
                      </Button>
                    </SpaceBetween>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UserDisplay;
