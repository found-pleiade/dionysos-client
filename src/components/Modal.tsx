import React, { useEffect } from 'react';
import useModal from '../hooks/modal';
import { preventDialogEscape, toggleDialog } from '../utils';

const Modal = ({
  modalRef,
  modal,
  children,
  className,
}: {
  modalRef: React.RefObject<any>,
  modal: ReturnType<typeof useModal>,
  children: React.ReactNode,
  className?: string,
}) => {
  useEffect(() => {
    preventDialogEscape(modalRef);
    toggleDialog(modal.isOpen, modalRef);
  }, [modal]);

  return (
    <dialog ref={modalRef} className={`min-w-[55ch] p-6 first-letter:space-y-6 bg-background-700 rounded-md relative space-y-6 text-foreground ${className}`}>
      {children}
    </dialog>
  );
};

export default Modal;
