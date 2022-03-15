import { ChatAltIcon, MenuIcon } from '@heroicons/react/solid';
import React from 'react';
import { visibility } from '../utils';

type OverlayMenuProps = {
  panel: boolean,
  setPanel: React.Dispatch<React.SetStateAction<boolean>>,
  chat: boolean,
  setChat: React.Dispatch<React.SetStateAction<boolean>>
}

const OverlayMenu = ({
  panel, setPanel, chat, setChat,
}: OverlayMenuProps) => {
  const iconStyle = 'block p-2 h-8 w-8 bg-neutral-700 rounded-full cursor-pointer text-center opacity-60 hover:opacity-100 transition-opacity';
  const iconMarge = !panel && !chat ? 'mb-3 last:mb-0' : '';

  return (
    <div className="absolute top-[50%] left-3 z-10 translate-y-[-50%]">
      <MenuIcon className={`${iconStyle} ${iconMarge} ${visibility(!panel)}`} onClick={() => setPanel(true)} />

      <ChatAltIcon className={`${iconStyle} ${iconMarge} ${visibility(!chat)}`} onClick={() => setChat(true)} />
    </div>
  );
};

export default OverlayMenu;
