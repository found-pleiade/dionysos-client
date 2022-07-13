import React, {
  Fragment, useContext, useState,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, GlobeAltIcon } from '@heroicons/react/solid';
import { ClipLoader } from 'react-spinners';
import Button from '../Button';
import Input from '../Input';
import SpaceBetween from '../SpaceBetween';
import useVersion from '../../hooks/version';
import ErrorCard from './ErrorCard';
import SettingsContext from '../../contexts/SettingContext';

const ServerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const settings = useContext(SettingsContext);
  const [serverAddress, setServerAddress] = useState(settings.get.server);
  const [serverAddressBackup, setServerAddressBackup] = useState(serverAddress);

  const {
    isStale, isLoading, error, data, refetch,
  } = useVersion(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const exitModal = () => {
    if (data) setServerAddress(serverAddressBackup);
    setIsOpen(false);
  };

  const saveModal = () => {
    refetch();
  };

  const saveAddress = () => {
    setServerAddressBackup(serverAddress);

    settings.dispatch({
      type: 'SET_SERVER',
      payload: { server: serverAddress },
    });
  };

  if (data && !isStale && isOpen) {
    closeModal();
  }

  const buttonText = () => {
    if (isLoading) {
      return <ClipLoader size="18px" color="white" />;
    }

    if (error) {
      return 'Retry';
    }

    if (data && !isStale) {
      return <CheckIcon className="text-white w-6 h-6" />;
    }

    return 'Save';
  };

  const buttonClassName = data && !isStale ? 'bg-light-success-400 dark:bg-dark-success-500' : '';

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

    if (data !== '0.1.0') {
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
      <Button className="absolute top-0 right-0 w-10 h-10 px-2 rounded-none rounded-bl-lg" onClick={openModal}>
        <GlobeAltIcon />
      </Button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={exitModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200 delay-500"
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
                leave="ease-in duration-200 delay-500"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-light-primary-100  dark:bg-dark-primary-700 dark:text-dark-secondary">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 mb-4"
                  >
                    Server address
                  </Dialog.Title>

                  <Input disabled={isLoading} className="mb-4" value={serverAddress} setValue={setServerAddress} />

                  {errorMessage()}

                  <SpaceBetween>
                    <Button onClick={exitModal} colorless>
                      Back
                    </Button>

                    <Button onClick={saveModal} onFocus={saveAddress} className={`w-[12ch] flex items-center justify-center ${buttonClassName}`}>
                      {buttonText()}
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
