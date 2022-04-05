import React from 'react';
import { idLength } from '../constants';
import { notNil } from '../utils';

const handleCopy = (id: string, copy: boolean | undefined) => {
  if (notNil(copy) && copy) {
    navigator.clipboard.writeText(id);
  }
};

/**
 * Display an ID.
 */
const Id = ({
  id, className, inline, short, copy,
}: {
  id: string,
  className?: string,
  inline?: boolean,
  short?: boolean,
  copy?: boolean
}) => {
  const idToDisplay = short ? id.substring(0, idLength) : id;
  const inlineClass = inline ? 'inline' : 'block';
  const title = copy ? 'Click to copy' : id;
  const buttonStyle = copy ? 'cursor-pointer hover:text-foreground/60' : 'focus:outline-none cursor-default';
  const tabIndex = copy ? 0 : -1;

  return (
    <span className={`text-md text-foreground/40 ${buttonStyle} transition-colors ${inlineClass} ${className}`} title={title} onClick={() => handleCopy(id, copy)} role="button" tabIndex={tabIndex} onKeyPress={(event) => { if (event.code === 'Enter') handleCopy(id, copy); }}>
      {idToDisplay}
    </span>
  );
};

export default Id;
