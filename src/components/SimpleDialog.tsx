import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, ReactElement, ReactNode } from "react";

const SimpleDialog = ({
  children,
  show,
  title,
  className,
  closeFunction,
  closeDelayCondition,
}: {
  children: ReactNode;
  show: boolean;
  title?: string | ReactElement;
  className?: string;
  closeFunction: () => void;
  closeDelayCondition?: boolean;
}) => {
  const closeDelayClass = closeDelayCondition ? `delay-[500ms]` : "";
  const durationClass = `delay-[300ms]`;

  const titleElement = title ? (
    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 mb-4">
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
          enter={`ease-out ${durationClass}`}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={`ease-in ${durationClass} ${closeDelayClass}`}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center md:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter={`ease-out ${durationClass}`}
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave={`ease-in ${durationClass} ${closeDelayClass}`}
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-lg transform overflow-hidden md:rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-light-primary-100  dark:bg-dark-primary-700 dark:text-dark-secondary ${className}`}
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
