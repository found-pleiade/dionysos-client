import React from 'react';

const RowGroup = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div className="flex space-x-1 w-full shadow-md shadow-dark-primary-800/30">
    {children}
  </div>
);

export default RowGroup;
