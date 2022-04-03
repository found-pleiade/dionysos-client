import { useState } from 'react';

export type ModalType = {
  isOpen: boolean,
  toggle: () => void,
}

const useModal = (): ModalType => {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    toggle,
  };
};

export default useModal;
