import { LockOpenIcon, LockClosedIcon } from '@heroicons/react/solid';
import React from 'react';

type EyeToggleProps = { toggle: boolean, onClick: any, onKeyPress: any };

const LockToggle = ({ toggle, onClick, onKeyPress }: EyeToggleProps) => {
  const style = 'px-2 h-10 w-11 cursor-pointer bg-background-500 hover:bg-background-400 text-foreground transition-colors';

  const lockOpen = (
    <LockOpenIcon
      className={style}
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onKeyPress}
    />
  );

  const lockClosed = (
    <LockClosedIcon
      className={style}
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onKeyPress}
    />
  );

  return toggle ? lockOpen : lockClosed;
};

export default LockToggle;
