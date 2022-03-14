import { useState } from 'react';
import { ModalType } from '../utils/types';

const useModal = (): ModalType => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  };
};

export default useModal;
