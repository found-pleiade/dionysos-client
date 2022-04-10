import { useRef, useState } from 'react';

const useModal = () => {
  /**
   * Check if the modal is opened.
   */
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef() as any;

  /**
   * Toggle the modal visibility, opened or closed.
   */
  function toggle() {
    setIsOpen(!isOpen);
  }

  return {
    ref,
    isOpen,
    toggle,
  };
};

export default useModal;
