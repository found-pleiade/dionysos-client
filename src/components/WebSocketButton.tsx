import { GlobeAltIcon } from '@heroicons/react/solid';
import React from 'react';
import { ModalType } from '../hooks/modal';
import { unvalidInput } from '../utils';

const handleInput = (modal: ModalType) => (event?: any) => {
  if (unvalidInput(event)) return;
  modal.toggle();
};

const WebSocketButton = ({ modal }: { modal: ModalType }) => {
  const colors = 'bg-accent-500 hover:bg-accent-400 focus:outline-pending text-foreground';
  const position = 'absolute top-0 right-0';
  const dimensions = 'w-10 h-10 px-2';
  const corners = 'rounded-bl-lg';

  return (
    <div title="Change WebSocket server" onClick={handleInput(modal)} onKeyPress={handleInput(modal)} tabIndex={0} role="button" className={`${position} ${dimensions} ${corners} ${colors} transition-colors grid place-items-center cursor-pointer`}>
      <GlobeAltIcon />
    </div>
  );
};

export default WebSocketButton;
