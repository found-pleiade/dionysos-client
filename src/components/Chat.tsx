import React from 'react';
import useSideMenu from '../hooks/sideMenu';
import { translate } from '../utils';
import MinimizeIcon from './MinimizeIcon';

const Chat = ({
  state,
  children,
}: {
  state: ReturnType<typeof useSideMenu>,
  children: React.ReactNode
}) => (
  <div className={`flex flex-col justify-between bg-light-primary-200/20 dark:bg-dark-primary-700/60 relative transition-all py-3 ${translate(state.isOpen)} shadow-xl shadow-light-primary-300 dark:shadow-dark-primary-800`}>
    <MinimizeIcon toggle={state.toggle} />
    {children}
  </div>
);

export default Chat;
