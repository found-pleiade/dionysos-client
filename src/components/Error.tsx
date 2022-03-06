import React from 'react';

const Error = ({
  error,
}: { error: string }) => (
  <p className="first-letter:uppercase bg-red-700 px-5 py-2 last:rounded-b-md error w-full text-center">
    {error}
    .
  </p>
);

export default Error;
