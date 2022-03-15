import { ChevronLeftIcon } from '@heroicons/react/solid';
import React from 'react';

const MinimizeIcon = ({ func }: { func: any }) => (
  <ChevronLeftIcon className="block absolute top-[50%] right-3 z-10 p-1 h-8 w-8 bg-neutral-700 rounded-full cursor-pointer text-center translate-y-[-50%]" onClick={() => func(false)} />
);

export default MinimizeIcon;
