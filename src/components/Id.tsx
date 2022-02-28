import React from 'react';

const Id = ({ userid }: { userid: string }) => (
  <button className="text-sm text-neutral-400 cursor-pointer  hover:text-neutral-300/90" title="Click to copy" onClick={() => navigator.clipboard.writeText(userid)} type="button">{userid}</button>
);

export default Id;
