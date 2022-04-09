import { useState } from 'react';

const useModal = (contextFunctions?: any) => {
  /**
   * Check if the modal is opened.
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggle the modal visibility, opened or closed.
   */
  function toggle() {
    setIsOpen(!isOpen);
  }

  const defaultObject = {
    isOpen,
    toggle,
  };

  /**
   * Context functions are functions like save, cancel, etc.
   * It should be an array, object or a function returning one.
   * Example : {save: () => {}, cancel: () => {}}
   */
  if (contextFunctions) {
    return {
      ...defaultObject,
      ...contextFunctions(defaultObject),
    };
  }

  return defaultObject;
};

export default useModal;
