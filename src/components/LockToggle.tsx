import { LockOpenIcon, LockClosedIcon } from '@heroicons/react/solid';
import React from 'react';

type EyeToggleProps = { toggle: boolean, onClick: any, onKeyPress: any };

const LockToggle = ({ toggle, onClick, onKeyPress }: EyeToggleProps) => {
  const style = 'px-2 h-10 w-8 cursor-pointer bg-background-500 hover:bg-background-400 text-foreground transition-colors flex justify-center align-center';

  return (
    <div
      className={style}
      onClick={onClick}
      onKeyPress={onKeyPress}
      tabIndex={0}
      role="button"
    >
      {toggle ? <LockClosedIcon /> : <LockOpenIcon className="text-accent-400" />}
    </div>
  );
};

export default LockToggle;
