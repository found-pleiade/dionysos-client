import React, { Children } from 'react';

/**
 * Basic container using flex and space-between to spread appart two items,
 * which is a reccuring pattern.
 */
const SpaceBetween = ({
  children,
}: {
  children: React.ReactNode
}) => {
  if (children && Children.count(children) !== 2) throw new Error('SpaceBetween expects exactly two children');

  return (
    <div className="flex justify-between">
      {children}
    </div>
  );
};

export default SpaceBetween;
