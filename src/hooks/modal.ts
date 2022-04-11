import { useRef, useState } from 'react';

const useModal = (pageRef: any) => {
  /**
   * Check if the modal is opened.
   */
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef() as any;

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
  function toggle(delay?: number) {
    setTimeout(() => {
      /* eslint-disable no-param-reassign */
      pageRef.current.style.transitionDuration = `${transitionDuration}ms`;
      pageRef.current.classList.toggle('background');
      modalRef.current.classList.toggle('showModal');
      modalRef.current.classList.toggle('hideModal');

      if (!isOpen) {
        setIsOpen(!isOpen);
      } else if (isOpen) {
        setTimeout(() => {
          setIsOpen(!isOpen);
        }, transitionDuration);
      }
    }, (delay || 0));
  }

  return {
    ref: modalRef,
    isOpen,
    toggle,
  };
};

export default useModal;
