import React from "react";
import useSideMenu from "../../states/sideMenu";
import { translate } from "../../utils";

const Panel = ({
  state,
  children,
}: {
  state: ReturnType<typeof useSideMenu>;
  children: React.ReactNode;
}) => (
  <div
    className={`flex flex-col justify-between bg-light-primary-100 dark:bg-dark-primary-900 relative transition-all py-3 ${translate(
      state.isOpen
    )} shadow-xl dark:shadow-black/50 z-[1]`}
  >
    {children}
  </div>
);

export default Panel;
