import React from 'react';
import * as R from 'ramda';
import { v4 } from 'uuid';
import { notNil } from '../utils';

const Error = ({
  error, duration,
}: { error: string | undefined, duration?: number }) => {
  if (R.isNil(error)) return <div />;

  const animationDuration = notNil(duration) ? duration : (error.length / 5);

  return (
    <p key={v4()} className="first-letter:uppercase bg-error font-medium p-2 last:rounded-b-md error w-full text-center" style={{ animationDuration: `${animationDuration}s` }}>
      {error}
    </p>
  );
};

export default Error;
