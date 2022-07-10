import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { GlobeAltIcon } from '@heroicons/react/solid';
import Button from '../Button';
import Input from '../Input';
import SpaceBetween from '../SpaceBetween';

const ServerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button className="absolute top-0 right-0 w-10 h-10 px-2 rounded-none rounded-bl-lg" onClick={openModal}>
        <GlobeAltIcon />
      </Button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
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
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-primary-700 dark:text-dark-secondary">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 mb-4"
                  >
                    Server address
                  </Dialog.Title>

                  <Input id="5" className="mb-6" />

                  <SpaceBetween>
                    <Button onClick={closeModal} colorless>
                      Cancel
                    </Button>

                    <Button onClick={closeModal}>
                      Save
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
