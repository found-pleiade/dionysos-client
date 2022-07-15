import React from 'react';

const CenterCard = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="flex flex-col items-center space-y-3 bg-light-primary-100 dark:bg-dark-primary-700 p-10 rounded-md min-w-[55ch]">
    <div className="font-medium text-xl text-center text-light-secondary dark:text-dark-secondary">
      {children}
    </div>
  </div>
);

export default CenterCard;
