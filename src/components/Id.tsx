import React from 'react';

const Id = ({ id }: { id: string }) => (
  <button className="text-sm text-neutral-400 cursor-pointer  hover:text-neutral-300/90" title="Click to copy" onClick={() => navigator.clipboard.writeText(id)} type="button">{id}</button>
);

export default Id;
