import { useState } from "react";

const useSideMenu = (open: boolean) => {
  const [isOpen, setIsOpen] = useState(open);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    toggle,
    setIsOpen
  };
};

export default useSideMenu;
