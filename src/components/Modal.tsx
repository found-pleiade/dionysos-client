import React, { useEffect } from 'react';
import useModal from '../hooks/modal';
import { notNil, preventDialogEscape, toggleDialog } from '../utils';

const Modal = ({
  modal,
  children,
  className,
}: {
  modal: ReturnType<typeof useModal>,
  children: React.ReactNode,
  className?: string,
}) => {
  useEffect(() => {
    preventDialogEscape(modal.ref);
    toggleDialog(modal.isOpen, modal.ref);
  }, [modal]);

  return (
    <dialog ref={modal.ref} className={`min-w-[55ch] p-6 first-letter:space-y-6 dark:bg-dark-dominant-700 rounded-md relative space-y-6 dark:text-dark-secondary ${notNil(className) ? className : ''} hideModal`}>
      {children}
    </dialog>
  );
};

export default Modal;
