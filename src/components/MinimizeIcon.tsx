import { ChevronLeftIcon } from '@heroicons/react/solid';
import React from 'react';

const MinimizeIcon = ({ toggle }: { toggle: any }) => (
  <ChevronLeftIcon className="block absolute top-[50%] right-3 z-10 p-1 h-8 w-8 dark:bg-dark-dominant-500 rounded-full cursor-pointer text-center translate-y-[-50%]" onClick={() => toggle(false)} />
);

export default MinimizeIcon;
