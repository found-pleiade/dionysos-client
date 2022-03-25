import React from 'react';
import * as R from 'ramda';
import { idLength } from '../constants';

const handleCopy = (id: string, copy: boolean | undefined) => {
  if (R.not(R.isNil(copy)) && copy) {
    navigator.clipboard.writeText(id);
  }
};

type IdProps = { id: string, className?: string, inline?: boolean, short?: boolean, copy?: boolean }

const Id = ({
  id, className, inline, short, copy,
}: IdProps) => {
  const idToDisplay = short ? id.substring(0, idLength) : id;
  const inlineClass = inline ? 'inline' : 'block';
  const title = copy ? 'Click to copy' : id;
  const buttonStyle = copy ? 'cursor-pointer hover:text-foreground/60' : 'cursor-default';
  const tabIndex = copy ? 0 : -1;

  return (
    <div className={`text-md text-foreground/40 ${buttonStyle} flex transition-colors ${inlineClass} ${className}`} title={title} onClick={() => handleCopy(id, copy)} role="button" tabIndex={tabIndex} onKeyPress={(event) => { if (event.code === 'Enter') handleCopy(id, copy); }}>
      {idToDisplay}
    </div>
  );
};

export default Id;
