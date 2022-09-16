import { MenuIcon } from "@heroicons/react/solid";
import React from "react";
import useSideMenu from "../../states/sideMenu";

type OverlayMenuProps = {
  panel: ReturnType<typeof useSideMenu>;
};

const OverlayMenu = ({ panel }: OverlayMenuProps) => {
  const iconStyle =
    "block p-2 h-10 w-10 bg-light-primary-400 dark:bg-dark-primary-600 rounded-full cursor-pointer text-center opacity-60 hover:opacity-100 transition-opacity";

  return (
    <div className="absolute top-3 left-3 z-10">
      <MenuIcon
        className={`${iconStyle} ${!panel.isOpen ? "visible" : "hidden"}`}
        onClick={() => panel.toggle()}
      />
    </div>
  );
};

export default OverlayMenu;
