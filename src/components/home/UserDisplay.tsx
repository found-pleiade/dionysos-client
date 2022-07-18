import React, {
  Fragment, useContext, useEffect, useState,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from '../Button';
import Input from '../Input';
import SpaceBetween from '../SpaceBetween';
import UserContext from '../../contexts/UserContext';
import useRenameUser from '../../hooks/renameUser';
import ErrorCard from '../ErrorCard';
import { isLenZero, notNil } from '../../utils';

const UserDisplay = () => {
  /**
   * Those are values used for setTimeouts, and the close animation.
   */
  const closeOnSuccessDelay = 500;
  const closeDuration = 200;

  /**
   * State of the modal with it's setters.
   */
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  /**
   * The user in the context, the state of the input and
   * a backup in case there is errors or edits without saving.
   */
  const user = useContext(UserContext);
  const [username, setUsername] = useState(user.get.name);
  const [usernameBackup, setUsernameBackup] = useState(username);

  /**
   * Mutation to rename the user. The reset is used to clear
   * the data and errors when the user closes the modal so
   * it can be run again.
   */
  const {
    data, isLoading, error, safeMutate, reset,
  } = useRenameUser(username);

  /**
   * Change the state of the modal with some effects.
   * Reset to clear errors after the close animation.
   */
  const exitModal = () => {
    if (!data) setUsername(usernameBackup);
    closeModal();

    setTimeout(() => {
      reset();
    }, closeDuration);
  };

  /**
   * Fire the mutation on save.
   */
  const saveModalOnClick = () => {
    safeMutate();
  };

  /**
   * Modify the user object as the user types.
   */
  useEffect(() => {
    user.dispatch({
      type: 'SET_NAME',
      payload: { name: username },
    });
  }, [username]);

  /**
   * Update the backup and close the modal on success.
   * Add a timeout with a reset to clear the data after
   * the animation is done.
   */
  useEffect(() => {
    setUsernameBackup(username);
    closeModal();

    setTimeout(() => {
      reset();
    }, closeOnSuccessDelay + closeDuration);
  }, [data]);

  /**
   * Change the visuals of the modal based on
   * the state of the server.
   */
  const saveButtonContent = () => {
    if (error) {
      return 'Retry';
    }

    return 'Save';
  };

  const closeDurationClass = `duration-${closeDuration}`;

  const closeDelayClass = data
    ? `delay-${closeOnSuccessDelay}`
    : '';

  const errorMessage = () => {
    if (isLenZero(username)) {
      return (
        <ErrorCard>
          Empty names are not allowed.
        </ErrorCard>
      );
    }

    if (error) {
      return (
        <ErrorCard>
          An error occurred while trying to rename you.
        </ErrorCard>
      );
    }

    return null;
  };

  return (
    <>
      <Button headless onClick={openModal} className="text-left">
        {user.get.name}
      </Button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={exitModal}>
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

                  <Input disabled={isLoading} className="mb-4" value={username} setValue={setUsername} />

                  {errorMessage()}

                  <SpaceBetween>
                    <Button onClick={exitModal} colorless>
                      Back
                    </Button>

                    <Button onClick={saveModalOnClick} className="w-[12ch] flex items-center justify-center" success={notNil(data)} disabled={isLenZero(username)} loading={isLoading}>
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

export default UserDisplay;
