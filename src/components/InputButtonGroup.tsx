import React from 'react';

const InputButtonGroup = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div className="flex space-x-1 w-full">
    {children}
  </div>
);

export default InputButtonGroup;
