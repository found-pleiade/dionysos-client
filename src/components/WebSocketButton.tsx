import { GlobeAltIcon } from '@heroicons/react/solid';
import React from 'react';
import useModal from '../hooks/modal';
import { invalidInput } from '../utils';

const handleInput = (modal: ReturnType<typeof useModal>) => (event?: any) => {
  if (invalidInput(event)) return;
  modal.toggle();
};

const WebSocketButton = ({ modal }: { modal: ReturnType<typeof useModal> }) => {
  const colors = 'bg-accent-500 hover:bg-accent-400 focus:outline-pending text-foreground';
  const position = 'absolute top-0 right-0';
  const dimensions = 'w-10 h-10 px-2';
  const corners = 'rounded-bl-lg';

  return (
    <button type="button" title="Change WebSocket server" onClick={handleInput(modal)} onKeyPress={handleInput(modal)} tabIndex={0} className={`${position} ${dimensions} ${corners} ${colors} transition-colors grid place-items-center cursor-pointer`}>
      <GlobeAltIcon />
    </button>
  );
};

export default WebSocketButton;
