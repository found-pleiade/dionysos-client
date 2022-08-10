import { ChevronLeftIcon } from "@heroicons/react/solid";
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
    className={`flex flex-col justify-between bg-light-primary-100/70 dark:bg-dark-primary-800/70 relative transition-all py-3 ${translate(
      state.isOpen
    )} shadow-xl shadow-light-primary-400/90 dark:shadow-dark-primary-800 z-[1]`}
  >
    <ChevronLeftIcon
      className="block absolute top-[50%] right-3 z-10 p-1 h-8 w-8 bg-light-primary-300 dark:bg-dark-primary-500 rounded-full cursor-pointer text-center translate-y-[-50%]"
      onClick={state.toggle}
    />
    {children}
  </div>
);

export default Panel;
