import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const ErrorCard = ({
  show,
  children,
  className,
}: {
  show: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <Transition
    show={show}
    as={Fragment}
    enter="ease-out duration-300"
    enterFrom="max-h-0 py-0"
    enterTo="max-h-24 py-2"
    leave={"ease-in duration-200"}
    leaveFrom="max-h-24 py-2"
    leaveTo="max-h-0 py-0"
  >
    <div
      className={`rounded-md overflow-hidden px-4 py-2 mb-4 font-medium text-light-error-100 bg-light-error-400 dark:text-dark-error-100 dark:bg-dark-error-900 select-text ${className}`}
    >
      {children}
    </div>
  </Transition>
);

export default ErrorCard;
