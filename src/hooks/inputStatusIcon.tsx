import { CheckIcon, DotsHorizontalIcon, XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

/**
 * Return icons for the connect modal, using the icon style provided.
 */
const formatIcons = (iconStyle: string) => ({
  valid: <CheckIcon className={`${iconStyle} dark:bg-dark-valid`} />,
  error: <XIcon className={`${iconStyle} dark:bg-dark-error-500`} />,
  pending: <DotsHorizontalIcon className={`${iconStyle} dark:bg-dark-pending animate-pulse-slow`} />,
});

function useInputStatusIcon(
  condition: boolean,
) {
  const icons = formatIcons('h-10 p-2 rounded-r-lg');
  const booleanIcon = condition ? icons.valid : icons.error;
  const [icon, setIcon] = useState(booleanIcon);

  return {
    current: icon,
    setCurrent: setIcon,
    icons,
  };
}

export default useInputStatusIcon;
