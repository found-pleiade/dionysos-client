import React from 'react';

const Error = ({
  error,
}: { error: string }) => (
  <p className="first-letter:uppercase bg-error font-medium p-2 last:rounded-b-md error w-full text-center">
    {error}
    .
  </p>
);

export default Error;
