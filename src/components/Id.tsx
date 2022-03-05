import React from 'react';
import { ClipboardIcon } from '@heroicons/react/solid';

const Id = ({ id }: { id: string }) => (
  <button className="text-sm text-neutral-400 cursor-pointer hover:text-neutral-300/90 flex" title="Click to copy" onClick={() => navigator.clipboard.writeText(id)} type="button">
    {id}
    {' '}
    <ClipboardIcon className="ml-2 w-5 h-5 items-center" />
  </button>
);

export default Id;
