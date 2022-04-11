import { useEffect, useRef, useState } from 'react';

const useModal = () => {
  /**
   * Check if the modal is opened.
   */
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef() as any;

  /**
   * Hardcoded because I didn't find a way to
   * access ::backdrop from js, even set a custom
   * css property doesn't seem to work. Change it in
   * index.css too.
   */
  const transitionDuration = 200;

  /**
   * Toggle the modal visibility, opened or closed.
   */
  function toggle() {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.transitionDuration = `${transitionDuration - 5}ms`;
    body.classList.toggle('background');
    ref.current.classList.toggle('showModal');
    ref.current.classList.toggle('hideModal');

    if (!isOpen) {
      setIsOpen(!isOpen);
    } else if (isOpen) {
      setTimeout(() => {
        setIsOpen(!isOpen);
      }, transitionDuration);
    }
  }

  return {
    ref,
    isOpen,
    toggle,
  };
};

export default useModal;
