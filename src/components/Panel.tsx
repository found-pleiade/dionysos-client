import React from 'react';
import useSideMenu from '../hooks/sideMenu';
import { translate } from '../utils';
import MinimizeIcon from './MinimizeIcon';

const Panel = ({
  state,
  children,
}: {
  state: ReturnType<typeof useSideMenu>,
  children: React.ReactNode,
}) => (
  <div className={`flex flex-col justify-between dark:bg-dark-dominant-800/60 relative transition-all py-3 ${translate(state.isOpen)} shadow-xl shadow-dark-dominant-800 z-[1]`}>
    <MinimizeIcon toggle={state.toggle} />
    {children}
  </div>
);

export default Panel;
