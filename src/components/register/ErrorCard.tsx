import React from 'react';

const ErrorCard = ({
  children,
}: {
  children: React.ReactNode,
}) => (
  <div className="px-4 py-2 mb-4 rounded-md font-medium text-light-error-100 bg-light-error-400 dark:text-dark-error-100 dark:bg-dark-error-900 select-text">
    {children}
  </div>
);

export default ErrorCard;
