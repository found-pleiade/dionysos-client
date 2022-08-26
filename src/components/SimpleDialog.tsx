import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, ReactNode } from "react";

const SimpleDialog = ({
  children,
  show,
  title,
  className,
  closeFunction,
  closeDuration,
  closeDelay,
  closeDelayCondition,
}: {
  children: ReactNode;
  show: boolean;
  title?: string;
  className?: string;
  closeFunction: () => void;
  closeDuration?: number;
  closeDelay?: number;
  closeDelayCondition?: boolean;
}) => {
  const closeDurationClass = closeDuration
    ? `duration-${closeDuration}`
    : "duration-300";

  const closeDelayClass = () => {
    if (closeDelayCondition === undefined && closeDelay !== undefined) {
      return `delay-${closeDelay}`;
    }

    if (closeDelayCondition) {
      return `delay-${closeDelay}`;
    }

    return "";
  };

  const titleElement = title ? (
    <Dialog.Title as="h3" className="text-lg font-medium leading-6 mb-4">
      {title}
    </Dialog.Title>
  ) : (
    <></>
  );

  return (
    <Transition show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeFunction}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={`ease-in ${closeDurationClass} ${closeDelayClass()}`}
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
              leave={`ease-in ${closeDurationClass} ${closeDelayClass()}`}
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-lg transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-light-primary-100  dark:bg-dark-primary-700 dark:text-dark-secondary ${className}`}
              >
                {titleElement}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SimpleDialog;
