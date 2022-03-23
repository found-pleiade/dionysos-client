import React from 'react';
import { ClipboardIcon } from '@heroicons/react/solid';

const Id = ({ id }: { id: string }) => (
  <button className="text-md text-foreground/40 cursor-pointer hover:text-foreground/60 flex transition-colors" title="Click to copy" onClick={() => navigator.clipboard.writeText(id)} type="button">
    {id}
    {' '}
    <ClipboardIcon className="ml-2 w-5 h-5 items-center" />
  </button>
);

export default Id;
