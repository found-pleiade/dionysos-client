import React, { useState } from 'react';
import { ModalType } from '../utils/types';

const useModal = (): ModalType => {
  const [isShowing, setIsShowing] = useState(false);
  const [content, setContent] = useState(<div />);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
    content,
    setContent,
  };
};

export default useModal;
